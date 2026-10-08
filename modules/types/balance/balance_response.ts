import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const BalanceResponseSchema = z.record(
  z.enum(['tenant', 'slc']),
  z.object({
    amountAvailable: z.number().openapi({ description: 'amount that is available at the moment', example: 1000 }),
    amountWaitingFunds: z.number().openapi({ description: 'amount scheduled to become available in the future', example: 1000 }),
    amountAvailableToTransfer: z.number().openapi({ description: 'amount that can be transferred', example: 900 }),
    amountAvailableToRefund: z.number().openapi({ description: 'amount that can be refunded', example: 800 }),
  }),
);

export type BalanceResponseDto = z.infer<typeof BalanceResponseSchema>;
