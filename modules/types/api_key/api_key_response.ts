import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const ApiKeyResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'fn7mz9CCKNyS3FU4dm6bT' }),
  key: z.string().openapi({ example: 'ipsp_J4fUCKKoljfQgH7T3LFMK' }),
  description: z.string().max(120).openapi({ example: 'API key for merchant' }),
  expiresAt: z.date().optional().nullable().openapi({ example: '2021-07-29T14:00:00Z' }),
  createdAt: z.date().openapi({ example: '2021-07-29T14:00:00Z' }),
});

export type ApiKeyResponseDto = z.infer<typeof ApiKeyResponseSchema>;

export const CreateApiKeyResponseSchema = ApiKeyResponseSchema.and(z.object({ secret: z.string().openapi({ example: 'QsHmZc45knfDBZmsRbF2R' }) }));

export type CreateApiKeyResponseDto = z.infer<typeof CreateApiKeyResponseSchema>;
