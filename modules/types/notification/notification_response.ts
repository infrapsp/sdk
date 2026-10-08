import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const NotificationResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'b2efdd02a13649ee97843' }),
  notificationTemplateId: ZodSchemas.alphanumericWithDash().openapi({ example: '1b393ed21ac74b398e552' }),
  data: z.record(z.string(), z.unknown()).openapi({ example: { key: 'value' } }),
  createdAt: z.date().openapi({ example: '2021-09-01T00:00:00.000Z' }),
});

export type NotificationResponseDto = z.infer<typeof NotificationResponseSchema>;
