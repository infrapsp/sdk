import { z } from 'zod';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';
import { ZodSchemas } from '$modules/types/zod.ts';

export enum TransactionAction {
  CREATE_TRANSACTION_ON_PROVIDER = 'create-transaction-on-provider',
  REFUND_TRANSACTION_ON_PROVIDER = 'refund-transaction-on-provider',
  PROCESS_PIX_PAID_TRANSACTION = 'process-pix-paid-transaction',
}

// create transaction on provider
export const CreateTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CREATE_TRANSACTION_ON_PROVIDER),
  payload: z.object({}),
});

// process paid transaction
export const ProcessPixPaidTransactionBodySchema = z.object({
  action: z.literal(TransactionAction.PROCESS_PIX_PAID_TRANSACTION),
  payload: z.object({
    endToEndId: z.string(),
    paidAt: ZodSchemas.datetime(),
  }),
});

// create refund on provider
export const RefundTransactionOnProvider = z.object({
  action: z.literal(TransactionAction.REFUND_TRANSACTION_ON_PROVIDER),
  payload: z.object({}),
});

// Worker
export const CreateTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateTransactionOnProviderBodySchema);
export const ProcessPixPaidTransactionWorkerBodySchema = BaseWorkerBodySchema.and(ProcessPixPaidTransactionBodySchema);
export const RefundTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(RefundTransactionOnProvider);
