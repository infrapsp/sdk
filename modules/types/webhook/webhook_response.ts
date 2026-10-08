import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { WebhookEvent } from '../../../modules/types/webhook/types.ts';

export const WebhookResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: '3cpFOr5ysxwWgkLfbbT27' }),
  merchantId: ZodSchemas.nanoid().optional().nullable().openapi({ example: 'CRutyJmJHin46NXnRdCjN' }),
  description: z.string().max(128).openapi({ example: 'my default webhook url' }),
  url: z.url().openapi({ example: 'https://example.com/webhook' }),
  isEnabled: z.boolean().openapi({ example: true }),
  events: z.array(z.enum(WebhookEvent)).openapi({ example: ['transaction', 'pre_transaction'] }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
});

export type WebhookResponseDto = z.infer<typeof WebhookResponseSchema>;
