import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { WebhookEvent } from '../../../modules/types/webhook/types.ts';

export const CreateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.url(),
  events: z.array(z.enum(WebhookEvent)).default([WebhookEvent.TRANSACTION, WebhookEvent.PRE_TRANSACTION]),
});

export type CreateWebhookBodyDto = z.infer<typeof CreateWebhookBodySchema>;
