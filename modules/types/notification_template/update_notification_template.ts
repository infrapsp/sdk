import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';

export const UpdateNotificationTemplateBodySchema = z.object({
  requiredFields: z.record(z.nativeEnum(NotificationTemplateFieldType)).optional().default({}),
  bellTemplate: z.string().nullable().optional(),
  emailTemplate: z.string().nullable().optional(),
  emailSubjectTemplate: z.string().nullable().optional(),
});

export const UpdateNotificationTemplateParamsSchema = BaseParamsSchema;

export type UpdateNotificationTemplateBodyDto = z.infer<typeof UpdateNotificationTemplateBodySchema>;
