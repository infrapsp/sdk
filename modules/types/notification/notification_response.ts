import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const NotificationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  data: z.record(z.unknown()),
  createdAt: z.date(),
});

export type NotificationResponseDto = z.infer<typeof NotificationResponseSchema>;
