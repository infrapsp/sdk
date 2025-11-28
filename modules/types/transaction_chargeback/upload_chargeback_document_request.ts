import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const UploadChargebackDocumentBodySchema = z.object({
  file: z.instanceof(File),
}).transform((dto, ctx) => {
  if (dto.file.size > 1024 * 1024 * 1) {
    ZodHelpers.issue(ctx, 'file', 'File size must be less than 1MB.');
  }

  if (!['application/pdf'].includes(dto.file.type)) {
    ZodHelpers.issue(ctx, 'file', 'Invalid file type. Only PDF documents are allowed.');
  }

  return dto;
});

export type UploadChargebackDocumentBodyDto = z.infer<typeof UploadChargebackDocumentBodySchema>;
