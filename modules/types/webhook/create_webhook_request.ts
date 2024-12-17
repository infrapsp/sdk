import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export const CreateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.string().url(),
});

export type CreateWebhookBodyDto = z.infer<typeof CreateWebhookBodySchema>;
