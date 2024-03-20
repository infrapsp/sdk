import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

export const CreateAddressBodySchema = z.object({
  zipCode: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
});

export type CreateAddressBodyDto = z.infer<typeof CreateAddressBodySchema>;
