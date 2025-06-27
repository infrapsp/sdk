import { Role } from '../../../modules/types/auth/types.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateApiKeyBodySchema = z.object({
  role: z.nativeEnum(Role).optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  description: z.string(),
  expiresAt: ZodSchemas.datetime().optional().nullable(),
});

export type CreateApiKeyBodyDto = z.infer<typeof CreateApiKeyBodySchema>;
