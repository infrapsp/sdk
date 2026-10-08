import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionStatsResponseSchema = z.object({
  timeKey: z.string().openapi({
    description: 'The time key for the transaction stats. Formatted as YYYY-MM-DD for date granularity stats or HH for hour granularity stats',
    example: '2023-10-01',
  }),
  status: z.enum(TransactionStatus).openapi({ description: 'The status of the grouped transactions', example: TransactionStatus.PAID }),
  method: z.enum(PaymentMethod).openapi({ description: 'The payment method of the grouped transactions', example: PaymentMethod.PIX }),
  amount: z.number().openapi({ description: 'The sum amount of all transactions for the given time key, status, and method', example: 1500 }),
  amountRefunded: z.number().openapi({
    description: 'The sum refunded amount of all transactions for the given time key, status, and method',
    example: 300,
  }),
  amountChargedback: z.number().openapi({
    description: 'The sum charged back amount of all transactions for the given time key, status, and method',
    example: 200,
  }),
  count: z.number().openapi({ description: 'The number of transactions for the given time key, status, and method', example: 10 }),
});

export type TransactionStatsResponseDto = z.infer<typeof TransactionStatsResponseSchema>;
