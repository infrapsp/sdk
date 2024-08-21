import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionRefundStatus } from '../../../modules/types/transaction/types.ts';

export const TransactionRefundResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  amount: z.number(),
  status: z.nativeEnum(TransactionRefundStatus),
  refundedAt: z.date().optional().nullable(),
  refundedData: z.object({
    rtrId: z.string().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
