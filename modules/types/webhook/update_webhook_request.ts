import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { WebhookEvent } from '../../../modules/types/webhook/types.ts';

export const UpdateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.url(),
  isEnabled: z.boolean().default(true),
  events: z.array(z.enum(WebhookEvent)).optional(),
});

export const UpdateWebhookParamsSchema = BaseParamsSchema;

export type UpdateWebhookBodyDto = z.infer<typeof UpdateWebhookBodySchema>;
