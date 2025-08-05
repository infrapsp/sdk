import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const TransactionCalculatorMethodInstallmentSchema = z.object({
  installment: z.number().int(),
  amount: z.number().int(),
  interestRatePercent: z.number().int(),
});

export const TransactionCalculatorMethodResponseSchema = z.object({
  method: z.string(),
  amount: z.number(),
  installments: z.array(TransactionCalculatorMethodInstallmentSchema),
});

export const TransactionCalculatorResponseSchema = z.array(TransactionCalculatorMethodResponseSchema);

export type TransactionCalculatorMethodInstallmentDto = z.infer<typeof TransactionCalculatorMethodInstallmentSchema>;
export type TransactionCalculatorMethodResponseDto = z.infer<typeof TransactionCalculatorMethodResponseSchema>;
export type TransactionCalculatorResponseDto = z.infer<typeof TransactionCalculatorResponseSchema>;
