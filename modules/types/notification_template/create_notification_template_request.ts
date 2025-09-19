import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';

export const CreateNotificationTemplateBodySchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
  requiredFields: z.record(z.string(), z.enum(NotificationTemplateFieldType)),
  bellTemplate: z.string().nullable(),
  emailTemplate: z.string().nullable(),
  emailSubjectTemplate: z.string().nullable(),
  slackTemplate: z.string().nullable(),
});

export type CreateNotificationTemplateBodyDto = z.infer<typeof CreateNotificationTemplateBodySchema>;
