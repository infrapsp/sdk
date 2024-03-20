import { Role } from '../../../modules/types/auth/types.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseResponseSchema } from '../../../modules/types/base/responses.ts';

export const ApiKeyResponseSchema = BaseResponseSchema.and(z.object({
  id: ZodSchemas.nanoid(),
  key: z.string(),
  role: z.nativeEnum(Role),
  merchantId: ZodSchemas.nanoid().optional().nullable(),
  tenantId: ZodSchemas.nanoid().optional().nullable(),
  description: z.string(),
  expiresAt: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}));

export type ApiKeyResponseDto = z.infer<typeof ApiKeyResponseSchema>;

export const CreateApiKeyResponseSchema = ApiKeyResponseSchema.and(z.object({ secret: z.string() }));

export type CreateApiKeyResponseDto = z.infer<typeof CreateApiKeyResponseSchema>;
