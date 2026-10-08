import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { WebhookEvent } from '../../../modules/types/webhook/types.ts';

export const CreateWebhookBodySchema = z.object({
  description: z.string().max(128).optional().openapi({ description: 'Description of the webhook', example: 'my default webhook url' }),
  url: z.url().openapi({ description: 'URL to receive the webhook', example: 'https://example.com/webhook' }),
  events: z.array(z.enum(WebhookEvent)).default([WebhookEvent.TRANSACTION, WebhookEvent.PRE_TRANSACTION]).openapi({
    description: 'Events this webhook subscribes to. See the Webhooks section for the available events and payload formats.',
    example: ['transaction', 'pre_transaction'],
  }),
});

export type CreateWebhookBodyDto = z.infer<typeof CreateWebhookBodySchema>;
