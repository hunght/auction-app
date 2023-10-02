import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(2).max(50),
  startingPrice: z.coerce.number().min(0).max(1000000),
  timeWindow: z.date().min(new Date()),
  status: z.enum(["DRAFT", "PUBLISHED", "COMPLETED"]),
});
