import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthMerchantResponseSchema = z.object({
  externalAuthId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'zpBxynBgNCzbdOKmpKG1k' }),
  tradingName: z.string().openapi({ example: 'merchant' }),
  logoUrl: z.string().optional().nullable().openapi({ example: 'https://example.com/logo.png' }),
  personName: z.string().openapi({ example: 'John Doe' }),
  companyName: z.string().optional().nullable().openapi({ example: 'Doe Enterprises' }),
  documentNumber: z.string().openapi({ example: '12345678900' }),
  status: z.enum(ExternalAuthStatus).openapi({ example: ExternalAuthStatus.ACTIVE }),
});

export type ExternalAuthMerchantResponseDto = z.infer<typeof ExternalAuthMerchantResponseSchema>;
