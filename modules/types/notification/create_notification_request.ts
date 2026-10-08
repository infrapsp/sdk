import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateNotificationBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash().openapi({ example: '1b393ed21ac74b398e552' }),
  data: z.record(z.string(), z.unknown()).openapi({ example: { key: 'value' } }),
});

export const CreateBulkNotificationCsvBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash().openapi({ example: '1b393ed21ac74b398e552' }),
  file: z.instanceof(File).openapi({
    type: 'string',
    format: 'binary',
    description: 'CSV file containing the notification data',
    example: 'emailTo;number;date\ntest1@email.com;15;2025-01-01T00:00:00.000Z\ntest2@email.com;25;2025-02-01T00:00:00.000Z',
  }),
}).transform((dto, ctx) => {
  if (dto.file.size > 1024 * 1024 * 1) {
    ZodHelpers.issue(ctx, 'file', 'File size must be less than 2MB.');
  }

  if (!['text/csv'].includes(dto.file.type)) {
    ZodHelpers.issue(ctx, 'file', 'Invalid file type. Only CSV documents are allowed.');
  }

  return dto;
});

export type CreateNotificationBodyDto = z.infer<typeof CreateNotificationBodySchema>;
