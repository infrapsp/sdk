import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const UpdateAddressBodySchema = z.object({
  line1: z.string().max(200),
  line2: z.string().max(100).optional(),
  number: z.string().max(10),
  neighborhood: z.string().max(100),
  zipCode: ZodSchemas.numeric().max(15),
  state: z.string().max(60),
  city: z.string().max(60),
  country: z.string().max(100),
  ibgeCode: ZodSchemas.numeric().max(10).optional(),
});

export type UpdateAddressBodyDto = z.infer<typeof UpdateAddressBodySchema>;
