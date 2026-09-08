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

const EMBEDDED_ACCOUNT: ServiceAccount = {
  client_email: "oussama@amazing-pipe-508010-q7.iam.gserviceaccount.com",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJTEQNCjO5URWS
BMHJmFdTA1JIqQ3jGH3x8TwT54H9ERvbmckLmksDHECo+dOTfiHbNEtqltusdL7R
6XIOXfAiqNjlDjoOFYNpEbz/Uw/RvmovH3UWdLxzTHgSdC2wONGjwYm2b00B0PDz
woNDmx9thSr53/MjaFqabK6bxqlc7iRBaEhY9EnP1gZcuZTpvpomixSgBdTCPI4e
aSUeaLIfOaGNx3JJ9LjKwp8aDo07AnTPdRzY4ImAfg8x9KGdTpNz1a9SW8rBYgTB
8Xj8njxwXC0BtlLIvKIOUcVkj8oR1E8Bbjdgnggn6TrF5JICLLs/ZrpRA4Hp063w
b/Qbr6DRAgMBAAECggEACFMXWFu05mPIStTYB8R9TgFL6JXXLW5QnQ4PIDqZeVP5
DTSXqBtuITeMpABK4+VaNJS9zq9k78WXM5qeHSJ84Q4PBC/5riXtHI3/fSab955S
iVbZcn+K4JDHwWmdDxXWc5l4HruNGXdg04/WelgCrXaNn65HgY4Z+xtmACqvy9g5
jhw484q6kcBO+KWhM/ysm1GiQUoS7W7LFCRn6wkFoFqEjizi48/hJg+rfyIGb/q3
f6hIlsXP5Nbz0Y5LPPaoL8SWaiqt0ZLZK5O9w1DO+DQE0WQNkxpsOjKowpTv+n+Y
vQgQ3t2CFN/eXwpxeglPPBbADpTZCmwGYpfTrAsoPQKBgQDqRpeMhDYa5fwGpy+C
8Wkc+8GBrDzKcBxIsEdwWP984Z3ybP+EgAbKeyQIzUQYv8Y24fUjFRyVgjmNKdUo
ZhIu+mGJlORhuellVjF+7n2JIerVn41c5/7J8aakUO7ckyQdDWDR1E00Z59Ir8zY
iMJqOyoGgi/wRM8k/Te0hclb5QKBgQDb9tJtmKbXkSUkMnK65N0qnPBLSncOMWBJ
r9PSPz3WWPaVTLVoxpMLSoMqbQurnqpbOJbtyX1IutEXUauMRYhGHSThowKFpjBp
Wgw30v3LpsKqiX1WNV/mXQ0Vk9WU1ISs+HB9kfKEg3CsULhklWsL6GXG7XZ+kATE
BXQPtV6afQKBgQDJfuOzsLcUVYB5fGwJ1HbSvdnGHQzAFMLO5gbbo0BC+Y4uxv7R
yIeOuXDZvSp3muHxrFB51xuZn8K+Hh++umOjUih3+76eKxeJ2COEB72jJ6/iAnPE
V6k1qYjpRM7cmhVyg2IlttKcYw+Fpeaqyp1kXvSbWne+0H/VUZEKzBLO3QKBgA30
pPkrHDrFDLQ1Ny5AYv/XIS/Fs7QE0fUa4LeQJ5432r0yNrhFEQNAYP4KGRl0YZ6U
Ao9nnzlEEQwHtHib2L+KDdL7Aqf0GVI10lygWFXZaLRlMLyNel4lPTVHQd/Fc/19
bbWp0tcxd66XGHvZNwd0YTCz1DbHcGX3apusiCoJAoGAM8LOz8qEVK9f3Uzrl0DX
iWBnQdBOGyO4JEIi3BF9qxXzcrL4dOOOMTxNo+IWlpr+IILYqty76iCobbtVYVn7
DuKH4tDTqRH6qWsO9vf29IsHnY6zSRxrnuRcXjOp57RfGlAwxoUICGuZKEr1EURS
+qXXl4xiyjmL4/Hk60UdiIk=
-----END PRIVATE KEY-----`,
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function envVar(name: string) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function spreadsheetId() {
  return envVar("GOOGLE_SHEETS_SPREADSHEET_ID") || DEFAULT_SPREADSHEET_ID;
}

function sheetName() {
  return envVar("GOOGLE_SHEETS_SHEET_NAME") || DEFAULT_SHEET_NAME;
}

function parseServiceAccountJson(raw: string): ServiceAccount {
  let text = raw.trim().replace(/^\uFEFF/, "");
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  let parsed: unknown = text;
  for (let i = 0; i < 2; i++) {
    if (typeof parsed !== "string") break;
    try {
      parsed = JSON.parse(parsed);
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON. Paste the full service-account file contents.");
    }
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON. Paste the full service-account file contents.");
  }

  const account = parsed as ServiceAccount;
  if (!account.client_email || !account.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON must include client_email and private_key.");
  }

  return {
    client_email: account.client_email,
    private_key: account.private_key.replace(/\\n/g, "\n"),
  };
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

async function loadServiceAccount(): Promise<ServiceAccount> {
  const inlineJson = envVar("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (inlineJson) return parseServiceAccountJson(inlineJson);

  const email = envVar("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const key = envVar("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")?.replace(/\\n/g, "\n");
  if (email && key) return { client_email: email, private_key: key };

  return EMBEDDED_ACCOUNT;
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
  const lovableKey = envVar("LOVABLE_API_KEY");
  const connectionKey = envVar("GOOGLE_SHEETS_API_KEY");
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

  await appendWithGoogleApi(row);
  return { ok: true as const };
}
