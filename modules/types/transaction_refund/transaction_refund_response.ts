import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionRefundStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionRefundStatusHistoryResponseSchema = z.object({
  status: z.nativeEnum(TransactionRefundStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransactionRefundResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  amount: z.number(),
  status: z.nativeEnum(TransactionRefundStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionRefundStatusHistoryResponseSchema),
  refundedAt: z.date().optional().nullable(),
  refundedData: z.object({
    rtrId: z.string().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
