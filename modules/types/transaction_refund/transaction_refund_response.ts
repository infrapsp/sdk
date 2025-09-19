import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionRefundStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionRefundStatusHistoryResponseSchema = z.object({
  status: z.enum(TransactionRefundStatus),
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
  status: z.enum(TransactionRefundStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionRefundStatusHistoryResponseSchema),
  refundedAt: z.date().optional().nullable(),
  refundedData: TransactionRefundRefundedDataResponseSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
