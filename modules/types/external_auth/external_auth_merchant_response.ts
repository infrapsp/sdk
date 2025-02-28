import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthMerchantResponseSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  tradingName: z.string(),
  documentNumber: z.string(),
  status: z.nativeEnum(ExternalAuthStatus),
});

export type ExternalAuthMerchantResponseDto = z.infer<typeof ExternalAuthMerchantResponseSchema>;
