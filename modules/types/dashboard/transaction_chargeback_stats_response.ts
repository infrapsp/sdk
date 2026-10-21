import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const TransactionChargebackStatsResponseSchema = z.object({
  timeKey: z.string().openapi({ description: 'The time key for the transaction chargeback stats. Formatted as YYYY-MM-DD', example: '2023-10-01' }),
  status: z.enum(TransactionChargebackStatus).openapi({
    description: 'The status of the grouped transaction chargebacks',
    example: TransactionChargebackStatus.WON,
  }),
  amount: z.number().openapi({ description: 'The sum amount of all transaction chargebacks for the given time key and status', example: 1500 }),
  wonAmount: z.number().openapi({
    description: 'The sum won amount of all transaction chargebacks for the given time key and status',
    example: 1200,
  }),
  holdAmount: z.number().openapi({
    description: 'The sum hold amount of all transaction chargebacks for the given time key and status',
    example: 1500,
  }),
  count: z.number().openapi({ description: 'The number of transaction chargebacks for the given time key and status', example: 10 }),
});

export type TransactionChargebackStatsResponseDto = z.infer<typeof TransactionChargebackStatsResponseSchema>;
