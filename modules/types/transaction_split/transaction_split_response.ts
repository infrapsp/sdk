import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const TransactionSplitDetailPayableResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  status: z.nativeEnum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
  paymentDate: z.date(),
  method: z.nativeEnum(PayableMethod),
  type: z.nativeEnum(PayableType),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TransactionSplitDetailResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  isFeePayer: z.boolean(),
  tradingName: z.string(),
  documentNumber: z.string(),
  payables: z.array(TransactionSplitDetailPayableResponseSchema),
});

export type TransactionSplitDetailResponseDto = z.infer<typeof TransactionSplitDetailResponseSchema>;
