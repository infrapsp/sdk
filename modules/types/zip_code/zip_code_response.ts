import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export const ZipCodeResponse = z.object({
  line1: z.string().optional().nullable(),
  line2: z.string().optional().nullable(),
  state: z.string(),
  city: z.string(),
  ibgeCode: z.string(),
  neighborhood: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  zipCode: z.string(),
});

export type ZipCodeResponseDto = z.infer<typeof ZipCodeResponse>;
