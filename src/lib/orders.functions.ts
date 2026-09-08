import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendOrderRow } from "./orders.server";
import { sendPurchaseCapi } from "./meta-capi.server";

const orderSchema = z.object({
  name: z.string().trim().min(3).max(80),
  phone: z.string().trim().min(9).max(20),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(5).max(200),
  offer: z.enum(["pack", "duo"]).default("pack"),
  eventId: z.string().min(8).max(80).optional(),
  eventSourceUrl: z.string().max(500).optional(),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(300).optional(),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await appendOrderRow(data);
    const eventId = data.eventId || `purchase_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    await sendPurchaseCapi({
      name: data.name,
      phone: data.phone,
      city: data.city,
      offer: data.offer,
      eventId,
      eventSourceUrl: data.eventSourceUrl,
      fbp: data.fbp,
      fbc: data.fbc,
    });
    return { ...result, eventId, value: data.offer === "duo" ? 229 : 189 };
  });
