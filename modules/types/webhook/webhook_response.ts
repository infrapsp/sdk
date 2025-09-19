import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const WebhookResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid().optional().nullable(),
  description: z.string().max(128),
  url: z.url(),
  isEnabled: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WebhookResponseDto = z.infer<typeof WebhookResponseSchema>;
