import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const CreateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.url(),
});

export type CreateWebhookBodyDto = z.infer<typeof CreateWebhookBodySchema>;
