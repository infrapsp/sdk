import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateNotificationBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  data: z.record(z.string(), z.unknown()),
});

export type CreateNotificationBodyDto = z.infer<typeof CreateNotificationBodySchema>;
