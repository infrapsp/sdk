import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const BaseParamsSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export const BaseQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().default(() => new Date()),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12)), // 1 year
  page: z.coerce.number().positive().int().default(1),
  pageSize: z.coerce.number().positive().int().max(1000).default(10),
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt');
  return dto;
});

export const EmptySchema = z.object({});
