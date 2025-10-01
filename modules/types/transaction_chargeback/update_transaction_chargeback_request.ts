import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const RestrictUpdateTransactionChargebackBodySchema = z.object({
  status: z.enum([TransactionChargebackStatus.DISPUTING, TransactionChargebackStatus.WON, TransactionChargebackStatus.LOST]),
});

export type RestrictUpdateTransactionChargebackBodyDto = z.infer<typeof RestrictUpdateTransactionChargebackBodySchema>;
