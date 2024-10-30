import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  id: z.string().optional(),
  customer: z.string(),
  address: z.string(),
  products: z.string(),
  status: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
