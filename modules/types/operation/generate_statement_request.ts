import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { FileFormat } from '../../../modules/types/base/types.ts';

export const GenerateStatementQuerySchema = z.object({
  format: z.enum(FileFormat).openapi({ description: 'format of the file', example: FileFormat.CSV }),
  paymentDateLte: ZodSchemas.datetime().default(() => new Date()).openapi({
    description: 'payment date less than or equal to',
    example: '2021-09-01T00:00:00.000Z',
  }),
  paymentDateGte: ZodSchemas.datetime().default(() => new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31)).openapi({
    description: 'payment date greater than or equal to',
    example: '2021-09-01T00:00:00.000Z',
  }), // 1 month,
}).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.paymentDateGte, dto.paymentDateLte, 1000 * 60 * 60 * 24 * 31, 'createdAt');

  return dto;
});

export type GenerateStatementQueryDto = z.infer<typeof GenerateStatementQuerySchema>;
