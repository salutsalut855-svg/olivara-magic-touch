import { META_PIXEL_ID } from "./meta-pixel";

const META_CAPI_TOKEN =
  "EAASGnXBxybgBSbfcVksgwCJW9dCV7GvEVfBWcUK3iR4wVPSDKP4JBuZCdqoHJwFMt9HjGy8jaVml4jkWc3vfOIhVCtQ34OssISUKQotdulLfAReQtbiMK6gFN7NSAv5ZCpXWRb0cH29AxTSabpF2LQFnaXoQ4UBeOLacbZC7mUJ1YvZAMLhvGmupicIITwJknwZDZD";

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeMoroccoPhone(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `212${digits.slice(1)}`;
  if (digits.length === 9 && (digits.startsWith("6") || digits.startsWith("7"))) {
    digits = `212${digits}`;
  }
  return digits;
}

export type CapiOrder = {
  name: string;
  phone: string;
  city: string;
  offer: "pack" | "duo";
  eventId: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
};

export async function sendPurchaseCapi(order: CapiOrder) {
  const value = order.offer === "duo" ? 229 : 189;
  const firstName = order.name.trim().split(/\s+/)[0] ?? "";
  const phone = normalizeMoroccoPhone(order.phone);

  const user_data: Record<string, unknown> = {
    country: [await sha256("ma")],
  };
  if (phone) user_data.ph = [await sha256(phone)];
  if (firstName) user_data.fn = [await sha256(firstName)];
  if (order.city) user_data.ct = [await sha256(order.city)];
  if (order.fbp) user_data.fbp = order.fbp;
  if (order.fbc) user_data.fbc = order.fbc;
  if (order.clientIp) user_data.client_ip_address = order.clientIp;
  if (order.userAgent) user_data.client_user_agent = order.userAgent;

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: order.eventId,
        action_source: "website",
        event_source_url: order.eventSourceUrl || "https://olivara.ma/",
        user_data,
        custom_data: {
          currency: "MAD",
          value,
          content_name: order.offer === "duo" ? "باقة عبوتين" : "الباقة الأساسية 3 في 1",
          content_ids: [order.offer],
          content_type: "product",
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      console.error(`Meta CAPI failed [${res.status}]: ${await res.text()}`);
    }
  } catch (err) {
    console.error("Meta CAPI error:", err);
  }
}
