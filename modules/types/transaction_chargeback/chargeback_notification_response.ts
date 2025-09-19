import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  ChargebackNotificationStatus,
  TransactionChargebackReason,
  TransactionChargebackRequiredDocument,
} from '../../../modules/types/transaction_chargeback/types.ts';

export const ChargebackNotificationResponse = z.object({
  id: ZodSchemas.nanoid(),
  transactionId: ZodSchemas.nanoid(),
  providerId: z.string().optional().nullable(),
  amount: z.number(),
  status: z.enum(ChargebackNotificationStatus),
  reason: z.enum(TransactionChargebackReason),
  requiredDocuments: z.array(z.enum(TransactionChargebackRequiredDocument)),
  providerData: z.record(z.string(), z.string()), // chargebackReasonCode e chargebackReasonDescription
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionChargebackResponseDto = z.infer<typeof ChargebackNotificationResponse>;
