import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const BalanceResponseSchema = z.object({
  amountAvailable: z.number(),
  amountWaitingFunds: z.number(),
  amountAvailableToTransfer: z.number(),
});

export type BalanceResponseDto = z.infer<typeof BalanceResponseSchema>;
