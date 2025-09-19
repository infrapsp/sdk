import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const BaseDashboardQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().default(() => new Date()),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 3)), // 3 months
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 3, 'createdAt');
  return dto;
});
