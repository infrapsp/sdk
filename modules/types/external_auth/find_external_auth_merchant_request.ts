import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const FindExternalAuthMerchantQuerySchema = z.object({
  externalUserId: z.string().optional(),
});

export type FindExternalAuthMerchantQueryDto = z.infer<typeof FindExternalAuthMerchantQuerySchema>;
