import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const UploadChargebackDocumentBodySchema = z.object({
  file: z.instanceof(File),
});

export type UploadChargebackDocumentBodyDto = z.infer<typeof UploadChargebackDocumentBodySchema>;
