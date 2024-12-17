import { Role } from '../../../modules/types/auth/types.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateApiKeyBodySchema = z.object({
  role: z.nativeEnum(Role).optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  description: z.string(),
  expiresAt: ZodSchemas.datetime().optional().nullable(),
});

export type CreateApiKeyBodyDto = z.infer<typeof CreateApiKeyBodySchema>;
