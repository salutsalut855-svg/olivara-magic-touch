import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().trim().min(3).max(80),
  phone: z.string().trim().min(9).max(20),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(5).max(200),
  offer: z.enum(["one", "two"]),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connectionKey) throw new Error("Google Sheets connection is not configured");

    const spreadsheetId = "1_qvK2Msau-RFTGBLqImAXEOcq53ZogBVAMysbfF8RbA";
    const range = "ecom!A:F";
    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const offerLabel = data.offer === "two" ? "عبوتان - 129 DH" : "عبوة واحدة - 79 DH";
    const row = [
      offerLabel,
      new Date().toLocaleDateString("fr-FR"),
      data.name,
      data.address,
      data.city,
      data.phone,
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Google Sheets append failed [${res.status}]: ${errorBody}`);
      throw new Error(`Google Sheets append failed [${res.status}]: ${errorBody}`);
    }

    return { ok: true as const };
  });