import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionChargebackReason,
  TransactionChargebackRequiredDocument,
  TransactionChargebackStatus,
} from '../../../modules/types/transaction_chargeback/types.ts';

export const TransactionChargebackStatusHistoryResponseSchema = z.object({
  status: z.enum(TransactionChargebackStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransactionChargebackResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  chargebackNotificationId: ZodSchemas.nanoid(),
  transactionId: ZodSchemas.nanoid(),
  providerId: z.string().optional().nullable(),
  amount: z.number(),
  wonAmount: z.number(),
  status: z.enum(TransactionChargebackStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionChargebackStatusHistoryResponseSchema),
  reason: z.enum(TransactionChargebackReason),
  requiredDocuments: z.array(z.enum(TransactionChargebackRequiredDocument)),
  documentUrl: z.string().optional().nullable(),
  providerData: z.record(z.string(), z.string()), // chargebackReasonCode e chargebackReasonDescription
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionChargebackResponseDto = z.infer<typeof TransactionChargebackResponseSchema>;
