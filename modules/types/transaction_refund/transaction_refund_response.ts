import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../zod.ts';
import { TransactionRefundStatus } from '../transaction/types.ts';

export const TransactionRefundResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  providerId: z.string().nullable().optional(),
  amount: z.number(),
  status: z.nativeEnum(TransactionRefundStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TransactionRefundResponseDto = z.infer<typeof TransactionRefundResponseSchema>;
