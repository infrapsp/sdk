import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const UpdateWebhookBodySchema = z.object({
  description: z.string().max(128).optional(),
  url: z.string().url(),
  isEnabled: z.boolean().default(true),
});

export const UpdateWebhookParamsSchema = BaseParamsSchema;

export type UpdateWebhookBodyDto = z.infer<typeof UpdateWebhookBodySchema>;
