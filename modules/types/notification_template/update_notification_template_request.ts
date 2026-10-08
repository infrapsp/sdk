import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const UpdateNotificationTemplateBodySchema = z.object({
  requiredFields: z.record(z.string(), z.enum(NotificationTemplateFieldType)).optional().default(() => ({})).openapi({
    description: 'The fields required to render the template and send the notification',
    example: {
      bellTo: NotificationTemplateFieldType.STRING,
      emailTo: NotificationTemplateFieldType.STRING,
      slackTo: NotificationTemplateFieldType.STRING,
    },
  }),
  bellTemplate: z.string().nullable().optional().openapi({
    description: 'Vento template to render the bell notification',
    example: 'Hi, {{bellTo}}, you have a new notification',
  }),
  emailTemplate: z.string().nullable().optional().openapi({
    description: 'Vento template to render the email notification',
    example: 'Hi, {{emailTo}}, you have a new notification',
  }),
  emailSubjectTemplate: z.string().nullable().optional().openapi({
    description: 'Vento template to render the email subject',
    example: 'New notification for {{emailTo}}',
  }),
  slackTemplate: z.string().nullable().optional().openapi({
    description: 'Vento template to render the slack notification',
    example: 'Hi, {{slackTo}}, you have a new notification',
  }),
});

export const UpdateNotificationTemplateParamsSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
});

export type UpdateNotificationTemplateBodyDto = z.infer<typeof UpdateNotificationTemplateBodySchema>;
