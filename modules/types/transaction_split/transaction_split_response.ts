import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const TransactionSplitDetailPayableResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  status: z.enum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
  paymentDate: z.date(),
  method: z.enum(PayableMethod),
  type: z.enum(PayableType),
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
