import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const ExternalAuthUserResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  externalUserId: z.string(),
  overrideRole: z.nativeEnum(MerchantRole),
  email: z.string().email(),
});

export type ExternalAuthUserResponseDto = z.infer<typeof ExternalAuthUserResponseSchema>;
