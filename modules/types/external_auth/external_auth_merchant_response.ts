import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthMerchantResponseSchema = z.object({
  externalAuthId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  tradingName: z.string(),
  logoUrl: z.string().optional().nullable(),
  documentNumber: z.string(),
  status: z.nativeEnum(ExternalAuthStatus),
});

export type ExternalAuthMerchantResponseDto = z.infer<typeof ExternalAuthMerchantResponseSchema>;
