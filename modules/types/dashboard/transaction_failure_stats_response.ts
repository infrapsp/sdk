import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { InfraPSPErrorCode } from '../../../modules/types/errors/types.ts';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionFailureStatsResponseSchema = z.object({
  status: z.enum([TransactionStatus.FAILED, TransactionStatus.EXPIRED]).openapi({
    description: 'The status of the grouped failed or expired transactions',
    example: TransactionStatus.FAILED,
  }),
  method: z.enum(PaymentMethod).openapi({ description: 'The payment method of the grouped transactions', example: PaymentMethod.CREDIT_CARD }),
  statusMessage: z.string().openapi({
    description: 'The reason code of the grouped transactions. Empty for expired transactions',
    example: InfraPSPErrorCode.TRX_CREDIT_CARD_VERIFY_DATA,
  }),
  amount: z.number().openapi({ description: 'The sum amount of all transactions for the given status, method, and status message', example: 1500 }),
  count: z.number().openapi({ description: 'The number of transactions for the given status, method, and status message', example: 10 }),
});

export type TransactionFailureStatsResponseDto = z.infer<typeof TransactionFailureStatsResponseSchema>;
