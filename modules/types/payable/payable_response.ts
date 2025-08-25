import { z } from 'npm:@hono/zod-openapi@0.19.8';
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
  status: z.nativeEnum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
  paymentDate: z.date(),
  method: z.nativeEnum(PayableMethod),
  type: z.nativeEnum(PayableType),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PayableResponseDto = z.infer<typeof PayableResponseSchema>;
