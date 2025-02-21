import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateNotificationBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  data: z.record(z.unknown()),
});

export type CreateNotificationBodyDto = z.infer<typeof CreateNotificationBodySchema>;
