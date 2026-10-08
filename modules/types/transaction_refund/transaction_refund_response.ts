import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionRefundStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionRefundStatusHistoryResponseSchema = z.object({
  status: z.enum(TransactionRefundStatus).openapi({ example: TransactionRefundStatus.REFUNDED }),
  message: z.string().openapi({ example: 'refunded succesfully' }),
  createdAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
});

export const TransactionRefundRefundedDataResponseSchema = z.object({
  rtrId: z.string(),
}).openapi({ title: 'Pix' }).or(
  z.object({
    nsu: z.string(),
  }).openapi({ title: 'Credit card' }),
).or(z.object({}).openapi({ title: 'Empty' }));

export const TransactionRefundResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'blPQsK6dOKOo08OoKyBF1' }),
  providerId: z.string().optional().nullable(),
  amount: z.number().openapi({ example: 1000 }),
  status: z.enum(TransactionRefundStatus).openapi({ example: TransactionRefundStatus.REFUNDED }),
  statusMessage: z.string().openapi({ example: 'refunded succesfully' }),
  statusHistory: z.array(TransactionRefundStatusHistoryResponseSchema).openapi({ description: 'history of status changes' }),
  refundedAt: z.date().optional().nullable().openapi({ example: '2021-10-25T20:00:00.000Z' }),
  refundedData: TransactionRefundRefundedDataResponseSchema.openapi({ example: { rtrId: 'E12345678202009091221HGLB62P7kzw' } }),
  createdAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
