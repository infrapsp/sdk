import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export const PayableAggregationResponseSchema = z.object({
  merchantAmount: z.number().int(),
  feeAmount: z.number().int(),
});

export type PayableAggregationResponseDto = z.infer<typeof PayableAggregationResponseSchema>;
