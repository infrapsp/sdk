import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { OperationStatus, OriginEntity, OriginMethod } from '../../../modules/types/operation/types.ts';

export const FindOperationQuerySchema = BaseQuerySchema.and(
  z.object({
    payableId: ZodSchemas.nanoid().optional().openapi({
      description: 'filter the operations related to this payable id',
      example: 'v1vvAMmAePFJdkAU073hc',
    }),
    method: z.enum(OriginMethod).optional().openapi({ description: 'filter by the method that originated the operation', example: OriginMethod.PIX }),
    entity: z.enum(OriginEntity).optional().openapi({
      description: 'filter by the entity that originated the operation',
      example: OriginEntity.TRANSACTION,
    }),
    status: ZodSchemas.stringArray(z.enum(OperationStatus)).optional().openapi({
      description: 'comma-separated list of pre transaction status',
      example: [OperationStatus.AVAILABLE],
    }),
    notStatus: ZodSchemas.stringArray(z.enum(OperationStatus)).optional().openapi({
      description: 'comma-separated list of pre transaction status to not be included',
      example: OperationStatus.AVAILABLE,
    }),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', example: SortOrder.DESC }),
    paymentDateLte: ZodSchemas.datetime().optional().openapi({
      description: 'filter by payment date less than or equal to this date',
      example: '2021-09-01T00:00:00.000Z',
    }),
    paymentDateGte: ZodSchemas.datetime().optional().openapi({
      description: 'filter by payment date greater than or equal to this date',
      example: '2021-09-01T00:00:00.000Z',
    }),
  }),
).transform((dto, ctx) => {
  // paymentDate validation
  if ((dto.paymentDateGte && !dto.paymentDateLte) || (dto.paymentDateLte && !dto.paymentDateGte)) {
    ZodHelpers.issue(ctx, 'paymentDate', 'should inform both paymentDateGte and paymentDateLte');
  }

  if (dto.paymentDateGte && dto.paymentDateLte) {
    ZodRefines.validDateRange(ctx, dto.paymentDateGte, dto.paymentDateLte, 1000 * 60 * 60 * 24 * 30 * 12, 'paymentDate');
  }

  return dto;
});

export const FindOperationParamsSchema = BaseParamsSchema;

export type FindOperationParamsDto = z.infer<typeof FindOperationParamsSchema>;
export type FindOperationQueryDto = z.infer<typeof FindOperationQuerySchema>;
