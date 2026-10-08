import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const FindFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
});

export const RestrictFindFeeRuleQuerySchema = z.object({
  endDateLte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)).openapi({
    example: '2024-12-31T23:59:59Z',
  }), // 30 days
  endDateGte: ZodSchemas.datetime().default(() => new Date()).openapi({ example: '2024-01-01T00:00:00Z' }),
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.endDateGte, dto.endDateLte, 1000 * 60 * 60 * 24 * 30, 'endDate');
  return dto;
});

export type FindFeeRuleQueryDto = z.infer<typeof FindFeeRuleQuerySchema>;
export type RestrictFindFeeRuleQueryDto = z.infer<typeof RestrictFindFeeRuleQuerySchema>;
