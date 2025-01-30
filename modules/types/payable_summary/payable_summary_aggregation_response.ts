import { z } from 'npm:@hono/zod-openapi@0.18.3';

export const PayableSummaryAggregationResponseSchema = z.object({
  amountTransferredCurrentDay: z.number(),
  amountTransferredCurrentMonth: z.number(),
});

export type PayableSummaryAggregationResponseDto = z.infer<typeof PayableSummaryAggregationResponseSchema>;
