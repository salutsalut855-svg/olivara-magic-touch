import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendCapiEvent } from "./meta-capi.server";

const metaEventSchema = z.object({
  eventName: z.enum([
    "PageView",
    "ViewContent",
    "FirstVisit",
    "ViewOrderForm",
    "InitiateCheckout",
    "Lead",
  ]),
  eventId: z.string().min(8).max(80),
  eventSourceUrl: z.string().max(500).optional(),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(300).optional(),
  offer: z.enum(["pack", "duo"]).optional(),
});

export const reportMetaEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => metaEventSchema.parse(data))
  .handler(async ({ data }) => {
    await sendCapiEvent(data);
    return { ok: true as const };
  });
