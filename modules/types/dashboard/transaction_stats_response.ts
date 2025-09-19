import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionStatsResponseSchema = z.object({
  timeKey: z.string(),
  status: z.enum(TransactionStatus),
  method: z.enum(PaymentMethod),
  amount: z.number(),
  amountRefunded: z.number(),
  amountChargedback: z.number(),
  count: z.number(),
});

export type TransactionStatsResponseDto = z.infer<typeof TransactionStatsResponseSchema>;
