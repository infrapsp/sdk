import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export const BalanceResponseSchema = z.object({
  amountAvailable: z.number(),
  amountWaitingFunds: z.number(),
  amountAvailableToTransfer: z.number(),
});

export type BalanceResponseDto = z.infer<typeof BalanceResponseSchema>;
