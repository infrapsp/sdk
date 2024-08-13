import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const FindPayableAggregationQuerySchema = z.object({
  transactionId: ZodSchemas.nanoid().optional(),
  transferId: ZodSchemas.nanoid().optional(),
}).transform((dto, ctx) => {
  if (!dto.transactionId && !dto.transferId) {
    ZodHelpers.issue(ctx, '', 'At least one of transactionId or transferId must be provided');
  }

  return dto;
});

export type FindPayableAggregationQueryDto = z.infer<typeof FindPayableAggregationQuerySchema>;
