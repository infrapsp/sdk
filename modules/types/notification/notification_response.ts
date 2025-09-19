import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const NotificationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  data: z.record(z.string(), z.unknown()),
  createdAt: z.date(),
});

export type NotificationResponseDto = z.infer<typeof NotificationResponseSchema>;
