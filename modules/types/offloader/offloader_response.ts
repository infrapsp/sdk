import { Role, TokenType } from '$modules/types/auth/types.ts';
import { z } from 'hono/zod-openapi';
import { ZodSchemas } from '$modules/types/zod.ts';

export const OffloaderResponseSchema = z.object({
  role: z.nativeEnum(Role),
  merchantId: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  externalUserId: z.string(),
  tokenType: z.nativeEnum(TokenType),
  apiKeyId: ZodSchemas.nanoid(),
  scope: z.string(),
});

export type OffloaderResponseDto = z.infer<typeof OffloaderResponseSchema>;
