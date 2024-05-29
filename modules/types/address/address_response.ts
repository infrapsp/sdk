import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export const AddressResponseSchema = z.object({
  line1: z.string(),
  line2: z.string().optional().nullable(),
  number: z.string(),
  neighborhood: z.string(),
  zipCode: z.string(),
  state: z.string(),
  city: z.string(),
  country: z.string(),
});

export type AddressResponseDto = z.infer<typeof AddressResponseSchema>;
