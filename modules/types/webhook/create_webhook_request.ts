import { z } from 'npm:@hono/zod-openapi@0.18.3';

export const CreateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.string().url(),
});

export type CreateWebhookBodyDto = z.infer<typeof CreateWebhookBodySchema>;
