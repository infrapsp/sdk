import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const PayableResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  transactionId: ZodSchemas.nanoid().optional().nullable(),
  transferId: ZodSchemas.nanoid().optional().nullable(),
  transactionSplitId: ZodSchemas.nanoid().optional().nullable(),
  transactionRefundId: ZodSchemas.nanoid().optional().nullable(),
  isTransactionOwner: z.boolean().optional().nullable(),
  status: z.enum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
  paymentDate: z.date(),
  method: z.enum(PayableMethod),
  type: z.enum(PayableType),
  installment: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PayableResponseDto = z.infer<typeof PayableResponseSchema>;
