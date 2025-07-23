import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionStatsResponseSchema = z.object({
  timeKey: z.string(),
  status: z.nativeEnum(TransactionStatus),
  method: z.nativeEnum(PaymentMethod),
  amount: z.number(),
  amountRefunded: z.number(),
  count: z.number(),
});

export type TransactionStatsResponseDto = z.infer<typeof TransactionStatsResponseSchema>;
