import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TransactionCalculatorQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  amount: z.number({ coerce: true }).positive(),
  installmentsWithoutInterest: z.number({ coerce: true }).positive().optional(),
});

export type TransactionCalculatorQueryDto = z.infer<typeof TransactionCalculatorQuerySchema>;
