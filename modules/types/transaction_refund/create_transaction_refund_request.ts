import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransactionRefundBodySchema = z.object({
  amount: z.number().positive().int(),
});

export const CreateTransactionRefundParamsSchema = z.object({
  transactionId: ZodSchemas.nanoid(),
});

export type CreateTransactionRefundBodyDto = z.infer<typeof CreateTransactionRefundBodySchema>;
