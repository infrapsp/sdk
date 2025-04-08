import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BinBrand, BinType } from '../../../modules/types/bin/types.ts';

export const BinResponseSchema = z.object({
  bin: z.string(),
  brand: z.nativeEnum(BinBrand),
  countryIsoCode3: z.string(),
  issuer: z.string(),
  type: z.nativeEnum(BinType),
});
