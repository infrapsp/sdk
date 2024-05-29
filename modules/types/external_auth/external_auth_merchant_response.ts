import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const ExternalAuthMerchantResponseSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  tradingName: z.string(),
});

export type ExternalAuthMerchantResponseDto = z.infer<typeof ExternalAuthMerchantResponseSchema>;
