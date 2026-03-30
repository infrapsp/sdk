import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const BalanceResponseSchema = z.record(
  z.enum(['tenant', 'slc']),
  z.object({
    amountAvailable: z.number(),
    amountWaitingFunds: z.number(),
    amountAvailableToTransfer: z.number(),
    amountAvailableToRefund: z.number(),
  }),
);

export type BalanceResponseDto = z.infer<typeof BalanceResponseSchema>;
