import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const WebhookResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid().optional().nullable(),
  description: z.string().max(128),
  url: z.string().url(),
  isEnabled: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WebhookResponseDto = z.infer<typeof WebhookResponseSchema>;
