import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const ApiKeyResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  key: z.string(),
  description: z.string().max(120),
  expiresAt: z.date().optional().nullable(),
  createdAt: z.date(),
});

export type ApiKeyResponseDto = z.infer<typeof ApiKeyResponseSchema>;

export const CreateApiKeyResponseSchema = ApiKeyResponseSchema.and(z.object({ secret: z.string() }));

export type CreateApiKeyResponseDto = z.infer<typeof CreateApiKeyResponseSchema>;
