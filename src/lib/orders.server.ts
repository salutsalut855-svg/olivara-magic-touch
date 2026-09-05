const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "1_qvK2Msau-RFTGBLqImAXEOcq53ZogBVAMysbfF8RbA";
const SHEET_NAME = "ecom";

export type OrderRow = {
  name: string;
  phone: string;
  city: string;
  address: string;
  offer: "pack" | "duo";
};


function headers() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !connectionKey) throw new Error("Google Sheets connection is not configured");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connectionKey,
    "Content-Type": "application/json",
  };
}

async function call(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers: headers() });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
    throw new Error(`Google Sheets request failed [${res.status}]: ${errorBody}`);
  }
  return res.json() as Promise<any>;
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

  // Append to the next available row at the bottom of the sheet.
  await call(
    `/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:F:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [row] }) },
  );

  return { ok: true as const };
}