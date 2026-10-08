import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const BaseParamsSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a', description: 'unique identifier' }),
});

export const BaseQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().default(() => new Date()).openapi({
    description: 'filter by createdAt less than or equal to',
    example: '2021-01-02T02:59:59.999Z',
  }),
  // 1 year
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12)).openapi({
    description: 'filter by createdAt greater than or equal to',
    example: '2021-01-01T03:00:00.000Z',
  }),
  page: z.coerce.number().positive().int().default(1).openapi({ description: 'page number', example: 1, default: 1 }),
  pageSize: z.coerce.number().positive().int().max(1000).default(10).openapi({ description: 'number of items per page', example: 10, default: 10 }),
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt');
  return dto;
});

export const EmptySchema = z.object({});
