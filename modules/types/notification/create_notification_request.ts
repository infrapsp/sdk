import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateNotificationBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  data: z.record(z.string(), z.unknown()),
});

export const CreateBulkNotificationCsvBodySchema = z.object({
  notificationTemplateId: ZodSchemas.alphanumericWithDash(),
  file: z.instanceof(File),
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
