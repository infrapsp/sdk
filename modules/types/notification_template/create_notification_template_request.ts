import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';

export const CreateNotificationTemplateBodySchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
  requiredFields: z.record(z.nativeEnum(NotificationTemplateFieldType)),
  bellTemplate: z.string().nullable(),
  emailTemplate: z.string().nullable(),
  emailSubjectTemplate: z.string().nullable(),
});

export type CreateNotificationTemplateBodyDto = z.infer<typeof CreateNotificationTemplateBodySchema>;
