import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const BaseParamsSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export const BaseQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().default(() => new Date().toISOString()),
  createdAtGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12).toISOString()), // 1 year
  page: z.number({ coerce: true }).positive().int().default(1),
  pageSize: z.number({ coerce: true }).positive().int().max(1000).default(10),
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt');
  return dto;
});

export const EmptySchema = z.object({});
