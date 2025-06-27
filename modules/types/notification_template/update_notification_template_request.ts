import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const UpdateNotificationTemplateBodySchema = z.object({
  requiredFields: z.record(z.nativeEnum(NotificationTemplateFieldType)).optional().default({}),
  bellTemplate: z.string().nullable().optional(),
  emailTemplate: z.string().nullable().optional(),
  emailSubjectTemplate: z.string().nullable().optional(),
});

export const UpdateNotificationTemplateParamsSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
});

export type UpdateNotificationTemplateBodyDto = z.infer<typeof UpdateNotificationTemplateBodySchema>;
