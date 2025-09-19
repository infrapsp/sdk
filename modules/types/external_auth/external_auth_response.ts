import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthUserResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  externalUserId: z.string(),
  overrideRole: z.enum(MerchantRole),
  email: z.email(),
  name: z.string().optional().nullable(),
  status: z.enum(ExternalAuthStatus),
  createdAt: z.date(),
});

export type ExternalAuthUserResponseDto = z.infer<typeof ExternalAuthUserResponseSchema>;
