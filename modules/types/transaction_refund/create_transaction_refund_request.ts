import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransactionRefundBodySchema = z.object({
  amount: z.number().positive().int().openapi({ example: 1000, description: 'amount in cents to be refunded' }),
});

export const CreateTransactionRefundParamsSchema = z.object({
  transactionId: ZodSchemas.nanoid().openapi({ example: 'gnQjJatJSrhxaGtXeTuDd', description: 'transaction id' }),
});

export type CreateTransactionRefundBodyDto = z.infer<typeof CreateTransactionRefundBodySchema>;
