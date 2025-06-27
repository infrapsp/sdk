import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { FileFormat } from '../../../modules/types/base/types.ts';

export const GenerateStatementQuerySchema = z.object({
  format: z.nativeEnum(FileFormat),
  paymentDateLte: ZodSchemas.datetime().default(() => new Date().toISOString()),
  paymentDateGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31).toISOString()), // 1 month,
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.paymentDateGte, dto.paymentDateLte, 1000 * 60 * 60 * 24 * 31, 'createdAt');

  return dto;
});

export type GenerateStatementQueryDto = z.infer<typeof GenerateStatementQuerySchema>;
