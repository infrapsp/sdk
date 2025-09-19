import { Role } from '../../../modules/types/auth/types.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateApiKeyBodySchema = z.object({
  role: z.enum(Role).optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  description: z.string(),
  expiresAt: ZodSchemas.datetime().optional().nullable(),
});

export type CreateApiKeyBodyDto = z.infer<typeof CreateApiKeyBodySchema>;
