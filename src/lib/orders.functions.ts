import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendOrderRow } from "./orders.server";

const orderSchema = z.object({
  name: z.string().trim().min(3).max(80),
  phone: z.string().trim().min(9).max(20),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(5).max(200),
  offer: z.enum(["pack", "duo"]).default("pack"),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    return appendOrderRow(data);
  });
