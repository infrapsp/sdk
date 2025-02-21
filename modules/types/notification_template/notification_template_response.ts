import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { NotificationTemplateFieldType } from '../../../modules/types/notification_template/types.ts';

export const NotificationTemplateResponseSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
  requiredFields: z.record(z.nativeEnum(NotificationTemplateFieldType)),
  bellTemplate: z.string().nullable(),
  emailTemplate: z.string().nullable(),
  emailSubjectTemplate: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationTemplateResponseDto = z.infer<typeof NotificationTemplateResponseSchema>;
