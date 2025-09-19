import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const BalanceResponseSchema = z.object({
  amountAvailable: z.number(),
  amountWaitingFunds: z.number(),
  amountAvailableToTransfer: z.number(),
});

export type BalanceResponseDto = z.infer<typeof BalanceResponseSchema>;
