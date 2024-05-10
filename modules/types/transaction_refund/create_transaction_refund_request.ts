import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransactionRefundBodySchema = z.object({
  amount: z.number().positive().int(),
});

export const CreateTransactionRefundParamsSchema = z.object({
  transactionId: ZodSchemas.nanoid(),
});

export type CreateTransactionRefundBodyDto = z.infer<typeof CreateTransactionRefundBodySchema>;
