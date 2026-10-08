import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { FileFormat } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const GenerateInvoiceReportQuerySchema = z.object({
  format: z.enum(FileFormat).openapi({ example: FileFormat.CSV }),
  createdAtLte: ZodSchemas.datetime().default(() => new Date()).openapi({ example: '2022-01-01T00:00:00.000Z' }),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31)).openapi({
    example: '2021-12-01T00:00:00.000Z',
  }), // 1 month,
});

export type GenerateInvoiceReportQueryDto = z.infer<typeof GenerateInvoiceReportQuerySchema>;
