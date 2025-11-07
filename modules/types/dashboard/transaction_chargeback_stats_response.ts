import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const TransactionChargebackStatsResponseSchema = z.object({
  timeKey: z.string(),
  status: z.enum(TransactionChargebackStatus),
  amount: z.number(),
  wonAmount: z.number(),
  count: z.number(),
});

export type TransactionChargebackStatsResponseDto = z.infer<typeof TransactionChargebackStatsResponseSchema>;
