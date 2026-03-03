import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const FindFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
});

export const RestrictFindFeeRuleQuerySchema = z.object({
  endDateLte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)), // 30 days
  endDateGte: ZodSchemas.datetime().default(() => new Date()),
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.endDateGte, dto.endDateLte, 1000 * 60 * 60 * 24 * 30, 'endDate');
  return dto;
});

export type FindFeeRuleQueryDto = z.infer<typeof FindFeeRuleQuerySchema>;
export type RestrictFindFeeRuleQueryDto = z.infer<typeof RestrictFindFeeRuleQuerySchema>;
