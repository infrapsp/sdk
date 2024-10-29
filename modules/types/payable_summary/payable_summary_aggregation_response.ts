import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export const PayableSummaryAggregationResponseSchema = z.object({
  amountTransferredCurrentDay: z.number(),
  amountTransferredCurrentMonth: z.number(),
});

export type PayableSummaryAggregationResponseDto = z.infer<typeof PayableSummaryAggregationResponseSchema>;
