import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { WebhookEvent } from '../../../modules/types/webhook/types.ts';

export const UpdateWebhookBodySchema = z.object({
  description: z.string().max(128).optional().openapi({ description: 'Description of the webhook', example: 'my default webhook url' }),
  url: z.url().optional().openapi({ description: 'URL to receive the webhook', example: 'https://example.com/webhook' }),
  isEnabled: z.boolean().default(true).openapi({ description: 'Enable or disable the webhook', example: true }),
  events: z.array(z.enum(WebhookEvent)).optional(),
});

export const UpdateWebhookParamsSchema = BaseParamsSchema;

export type UpdateWebhookBodyDto = z.infer<typeof UpdateWebhookBodySchema>;
