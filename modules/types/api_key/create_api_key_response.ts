import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ApiKeyResponseSchema } from '../../../modules/types/api_key/api_key_response.ts';

export const CreateApiKeyResponseSchema = ApiKeyResponseSchema.and(z.object({ secret: z.string() }));

export type CreateApiKeyResponseDto = z.infer<typeof CreateApiKeyResponseSchema>;
