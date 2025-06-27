import { z } from 'hono/zod-openapi';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';
import { ZodSchemas } from '$modules/types/zod.ts';
import { PaymentMethod, TransactionRefundStatus } from '$modules/types/transaction/types.ts';
import { ClearsaleOrderStatus } from '$modules/clearsale/types/clearsale_create_order_response.ts';

export enum TransactionAction {
  CREATE_TRANSACTION_ON_PROVIDER = 'create-transaction-on-provider',
  CREATE_TRANSACTION_ON_ANTIFRAUD_PROVIDER = 'create-transaction-on-antifraud-provider',
  UPDATE_TRANSACTION_ON_ANTIFRAUD_PROVIDER = 'update-transaction-on-antifraud-provider',
  REFUND_TRANSACTION_ON_PROVIDER = 'refund-transaction-on-provider',
  PROCESS_PIX_PAID_TRANSACTION = 'process-pix-paid-transaction',
  CANCEL_TRANSACTION_ON_PROVIDER = 'cancel-transaction-on-provider',
  RESTRICT_CARD = 'restrict-card',
  CAPTURE_TRANSACTION_ON_PROVIDER = 'capture-transaction-on-provider',
  PROCESS_ANTIFRAUD_ANALYSIS = 'process-antifraud-analysis',
  PROCESS_TRANSACTION_REFUND = 'process-transaction-refund',
}

// create transaction on provider
export const CreateTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CREATE_TRANSACTION_ON_PROVIDER),
  payload: z.object({
    method: z.nativeEnum(PaymentMethod),
  }),
});

// process paid transaction
export const ProcessPixPaidTransactionBodySchema = z.object({
  action: z.literal(TransactionAction.PROCESS_PIX_PAID_TRANSACTION),
  payload: z.object({
    endToEndId: z.string(),
    paidAt: ZodSchemas.datetime(),
  }),
});

// refund on provider
export const RefundTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.REFUND_TRANSACTION_ON_PROVIDER),
  payload: z.object({
    method: z.nativeEnum(PaymentMethod),
  }),
});

// process transaction refund
export const ProcessTransactionRefundBodySchema = z.object({
  action: z.literal(TransactionAction.PROCESS_TRANSACTION_REFUND),
  payload: z.object({
    status: z.nativeEnum(TransactionRefundStatus),
    refundedAt: ZodSchemas.datetime(),
    nsu: z.string(),
  }),
});

// cancel transaction on provider
export const CancelTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CANCEL_TRANSACTION_ON_PROVIDER),
  payload: z.object({
    method: z.nativeEnum(PaymentMethod),
  }),
});

// restrict card
export const RestrictCardBodySchema = z.object({
  action: z.literal(TransactionAction.RESTRICT_CARD),
  payload: z.object({
    bin: z.string(),
    last4: z.string(),
    expirationMonth: z.string(),
    expirationYear: z.string(),
    brand: z.string().optional().nullable(),
    brandCode: z.string().optional().nullable(),
    brandMac: z.string().optional().nullable(),
    redeCode: z.string().optional().nullable(),
    amount: z.number(),
  }),
});

// capture transaction on provider
export const CaptureTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CAPTURE_TRANSACTION_ON_PROVIDER),
  payload: z.object({
    method: z.nativeEnum(PaymentMethod),
  }),
});

// process antifraud analysis
export enum AntifraudAnalysisStatus {
  ANALYZING = 'analyzing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const ProcessAntifraudAnalysisBodySchema = z.object({
  action: z.literal(TransactionAction.PROCESS_ANTIFRAUD_ANALYSIS),
  payload: z.object({
    providerScore: z.number(),
    providerStatus: z.nativeEnum(ClearsaleOrderStatus),
    status: z.nativeEnum(AntifraudAnalysisStatus),
    provider: z.string(),
  }),
});

// create transaction on antifraud
export const CreateTransactionOnAntifraudProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CREATE_TRANSACTION_ON_ANTIFRAUD_PROVIDER),
  payload: z.object({}),
});

export const UpdateTransactionOnAntifraudProviderBodySchema = z.object({
  action: z.literal(TransactionAction.UPDATE_TRANSACTION_ON_ANTIFRAUD_PROVIDER),
  payload: z.object({}),
});

// Worker
export const CreateTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateTransactionOnProviderBodySchema);
export const ProcessPixPaidTransactionWorkerBodySchema = BaseWorkerBodySchema.and(ProcessPixPaidTransactionBodySchema);
export const RefundTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(RefundTransactionOnProviderBodySchema);
export const CancelTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CancelTransactionOnProviderBodySchema);
export const RestrictCardWorkerBodySchema = BaseWorkerBodySchema.and(RestrictCardBodySchema);
export const CaptureTransactionOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CaptureTransactionOnProviderBodySchema);
export const ProcessTransactionRefundWorkerBodySchema = BaseWorkerBodySchema.and(ProcessTransactionRefundBodySchema);
export const CreateTransactionOnAntifraudProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateTransactionOnAntifraudProviderBodySchema);
export const UpdateTransactionOnAntifraudProviderWorkerBodySchema = BaseWorkerBodySchema.and(UpdateTransactionOnAntifraudProviderBodySchema);
export const ProcessAntifraudAnalysisWorkerBodySchema = BaseWorkerBodySchema.and(ProcessAntifraudAnalysisBodySchema);
