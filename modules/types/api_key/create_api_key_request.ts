import { Role } from '../../../modules/types/auth/types.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateApiKeyBodySchema = z.object({
  role: z.enum(Role).optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  description: z.string().openapi({ example: 'API key for merchant' }),
  expiresAt: ZodSchemas.datetime().optional().nullable().openapi({ example: '2021-07-29T14:00:00Z' }),
});

export type CreateApiKeyBodyDto = z.infer<typeof CreateApiKeyBodySchema>;
