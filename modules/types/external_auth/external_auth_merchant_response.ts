import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthMerchantResponseSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  tradingName: z.string(),
  status: z.nativeEnum(ExternalAuthStatus),
});

export type ExternalAuthMerchantResponseDto = z.infer<typeof ExternalAuthMerchantResponseSchema>;
