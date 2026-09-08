const LOVABLE_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SHEETS_API = "https://sheets.googleapis.com/v4";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const DEFAULT_SPREADSHEET_ID = "1_qvK2Msau-RFTGBLqImAXEOcq53ZogBVAMysbfF8RbA";
const DEFAULT_SHEET_NAME = "ecom";

export type OrderRow = {
  name: string;
  phone: string;
  city: string;
  address: string;
  offer: "pack" | "duo";
};

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function spreadsheetId() {
  return process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || DEFAULT_SPREADSHEET_ID;
}

function sheetName() {
  return process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || DEFAULT_SHEET_NAME;
}

function toBase64Url(data: ArrayBuffer | string) {
  const buf = typeof data === "string" ? Buffer.from(data, "utf8") : Buffer.from(data);
  return buf.toString("base64url");
}

function pemToPkcs8(pem: string) {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  return Buffer.from(b64, "base64");
}

async function loadServiceAccount(): Promise<ServiceAccount | null> {
  const inlineJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inlineJson) {
    const parsed = JSON.parse(inlineJson) as ServiceAccount;
    if (parsed.client_email && parsed.private_key) return parsed;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (email && key) return { client_email: email, private_key: key };

  const file =
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim() || "secrets/google-service-account.json";
  try {
    const { readFileSync } = await import("node:fs");
    const parsed = JSON.parse(readFileSync(file, "utf8")) as ServiceAccount;
    if (parsed.client_email && parsed.private_key) return parsed;
  } catch {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()) {
      throw new Error("Could not read GOOGLE_APPLICATION_CREDENTIALS file");
    }
  }

  return null;
}

async function getGoogleAccessToken(account: ServiceAccount) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${toBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${toBase64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  )}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToPkcs8(account.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${toBase64Url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Google auth failed [${res.status}]: ${errorBody}`);
  }

  const body = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + body.expires_in * 1000,
  };
  return cachedToken.value;
}

async function appendWithGoogleApi(row: string[]) {
  const account = await loadServiceAccount();
  if (!account) return false;

  const token = await getGoogleAccessToken(account);
  const range = encodeURIComponent(`${sheetName()}!A:F`);
  const url = `${SHEETS_API}/spreadsheets/${spreadsheetId()}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
    throw new Error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
  }
  return true;
}

function lovableHeaders() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !connectionKey) return null;
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connectionKey,
    "Content-Type": "application/json",
  };
}

async function appendWithLovable(row: string[]) {
  const headers = lovableHeaders();
  if (!headers) return false;

  const res = await fetch(
    `${LOVABLE_GATEWAY}/spreadsheets/${spreadsheetId()}/values/${sheetName()}!A:F:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", headers, body: JSON.stringify({ values: [row] }) },
  );
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
    throw new Error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
  }
  return true;
}

function formatDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export async function appendOrderRow(data: OrderRow) {
  const offerLabel =
    data.offer === "duo"
      ? "باقة OLIVARA عبوتين + بودرة + فرشاة - 229 DH (توصيل مجاني)"
      : "باقة OLIVARA 3 في 1 - 189 DH (توصيل مجاني)";

  const row = [
    offerLabel,
    formatDate(new Date()),
    data.name,
    data.address,
    data.city,
    data.phone,
  ];

  if (await appendWithGoogleApi(row)) return { ok: true as const };
  if (await appendWithLovable(row)) return { ok: true as const };

  throw new Error(
    "Google Sheets is not configured. Set GOOGLE_APPLICATION_CREDENTIALS (or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) and GOOGLE_SHEETS_SPREADSHEET_ID.",
  );
}
