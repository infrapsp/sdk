import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { FileFormat } from '../../../modules/types/base/types.ts';
import { FindTransactionQuerySchema } from '../../../modules/types/transaction/find_transaction_request.ts';

export const GenerateTransactionReportQuerySchema = FindTransactionQuerySchema.and(
  z.object({
    format: z.enum(FileFormat).openapi({ description: 'format of the file', example: FileFormat.CSV }),
  }),
);

export type GenerateTransactionReportQueryDto = z.infer<typeof GenerateTransactionReportQuerySchema>;
