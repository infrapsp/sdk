import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';
import { ExternalAuthStatus } from '../../../modules/types/external_auth/types.ts';

export const ExternalAuthUserResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  externalUserId: z.string(),
  overrideRole: z.nativeEnum(MerchantRole),
  email: z.string().email(),
  status: z.nativeEnum(ExternalAuthStatus),
});

export type ExternalAuthUserResponseDto = z.infer<typeof ExternalAuthUserResponseSchema>;
