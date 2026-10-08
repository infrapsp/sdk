import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';

export const CreateNotificationTemplateBodySchema = z.object({
  id: ZodSchemas.alphanumericWithDash().openapi({ example: '9d13a0eb48964d5bba23e' }),
  requiredFields: z.record(z.string(), z.enum(NotificationTemplateFieldType)).openapi({
    description: 'The fields required to render the template and send the notification',
    example: {
      bellTo: NotificationTemplateFieldType.STRING,
      emailTo: NotificationTemplateFieldType.STRING,
      slackTo: NotificationTemplateFieldType.STRING,
    },
  }),
  bellTemplate: z.string().nullable().openapi({
    description: 'Vento template to render the bell notification',
    example: 'Hi, {{bellTo}}, you have a new notification',
  }),
  emailTemplate: z.string().nullable().openapi({
    description: 'Vento template to render the email notification',
    example: 'Hi, {{emailTo}}, you have a new notification',
  }),
  emailSubjectTemplate: z.string().nullable().openapi({
    description: 'Vento template to render the email subject',
    example: 'New notification for {{emailTo}}',
  }),
  slackTemplate: z.string().nullable().openapi({
    description: 'Vento template to render the slack notification',
    example: 'Hi, {{slackTo}}, you have a new notification',
  }),
});

export type CreateNotificationTemplateBodyDto = z.infer<typeof CreateNotificationTemplateBodySchema>;
