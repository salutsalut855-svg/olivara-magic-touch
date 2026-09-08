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

export async function sendCapiEvent(input: {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  offer?: "pack" | "duo";
  name?: string;
  phone?: string;
  city?: string;
}) {
  const value = input.offer === "duo" ? 229 : 189;
  const user_data: Record<string, unknown> = {
    country: [await sha256("ma")],
  };
  if (input.phone) {
    const phone = normalizeMoroccoPhone(input.phone);
    if (phone) user_data.ph = [await sha256(phone)];
  }
  if (input.name) {
    const firstName = input.name.trim().split(/\s+/)[0] ?? "";
    if (firstName) user_data.fn = [await sha256(firstName)];
  }
  if (input.city) user_data.ct = [await sha256(input.city)];
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  const payload = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl || "https://olivara.boxliv.com/",
        user_data,
        custom_data: {
          currency: "MAD",
          value,
          content_name: input.offer === "duo" ? "باقة عبوتين" : "الباقة الأساسية 3 في 1",
          content_ids: [input.offer || "pack"],
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

export async function sendPurchaseCapi(order: CapiOrder) {
  await sendCapiEvent({
    eventName: "Purchase",
    eventId: order.eventId,
    eventSourceUrl: order.eventSourceUrl,
    fbp: order.fbp,
    fbc: order.fbc,
    offer: order.offer,
    name: order.name,
    phone: order.phone,
    city: order.city,
  });
}
