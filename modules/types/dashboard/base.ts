import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const BaseDashboardQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().default(() => new Date()).openapi({
    description: 'filter by createdAt less than or equal to',
    example: '2021-01-02T02:59:59.999Z',
  }),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 3)).openapi({
    description: 'filter by createdAt greater than or equal to',
    example: '2021-01-01T03:00:00.000Z',
  }), // 3 months
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 366, 'createdAt'); // 1 ano, cobrindo bissexto
  return dto;
});
