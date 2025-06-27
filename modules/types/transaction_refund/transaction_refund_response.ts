import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionRefundStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionRefundStatusHistoryResponseSchema = z.object({
  status: z.nativeEnum(TransactionRefundStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransactionRefundRefundedDataResponseSchema = z.object({
  rtrId: z.string(),
}).or(z.object({
  nsu: z.string(),
})).or(z.object({}));

export const TransactionRefundResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  providerId: z.string().optional().nullable(),
  amount: z.number(),
  status: z.nativeEnum(TransactionRefundStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionRefundStatusHistoryResponseSchema),
  refundedAt: z.date().optional().nullable(),
  refundedData: TransactionRefundRefundedDataResponseSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
