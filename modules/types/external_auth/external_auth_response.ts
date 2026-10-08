import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthUserResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'fn7mz9CCKNyS3FU4dm6bT' }),
  externalUserId: z.string().openapi({ example: 'externalUserId' }),
  overrideRole: z.enum(MerchantRole).openapi({ example: MerchantRole.MERCHANT }),
  email: z.email().openapi({ example: 'user@email.com' }),
  name: z.string().optional().nullable().openapi({ example: 'name' }),
  status: z.enum(ExternalAuthStatus).openapi({ example: ExternalAuthStatus.ACTIVE }),
  createdAt: z.date().openapi({ example: '2023-10-01T00:00:00.000Z' }),
});

export type ExternalAuthUserResponseDto = z.infer<typeof ExternalAuthUserResponseSchema>;
