import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const TransferSummaryResponseSchema = z.object({
  amountTransferredCurrentDay: z.number(),
  amountTransferredCurrentMonth: z.number(),
});

export type TransferSummaryResponseDto = z.infer<typeof TransferSummaryResponseSchema>;
