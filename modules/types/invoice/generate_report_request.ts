import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { FileFormat } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const GenerateInvoiceReportQuerySchema = z.object({
  format: z.nativeEnum(FileFormat),
  createdAtLte: ZodSchemas.datetime().default(() => new Date().toISOString()),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31).toISOString()), // 1 month,
});

export type GenerateInvoiceReportQueryDto = z.infer<typeof GenerateInvoiceReportQuerySchema>;
