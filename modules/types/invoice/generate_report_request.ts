import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { FileFormat } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const GenerateInvoiceReportQuerySchema = z.object({
  format: z.enum(FileFormat),
  createdAtLte: ZodSchemas.datetime().default(() => new Date()),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31)), // 1 month,
});

export type GenerateInvoiceReportQueryDto = z.infer<typeof GenerateInvoiceReportQuerySchema>;
