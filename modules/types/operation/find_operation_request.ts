import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { OperationStatus, OriginEntity, OriginMethod } from '../../../modules/types/operation/types.ts';

export const FindOperationQuerySchema = BaseQuerySchema.and(
  z.object({
    payableId: ZodSchemas.nanoid().optional(),
    method: z.nativeEnum(OriginMethod).optional(),
    entity: z.nativeEnum(OriginEntity).optional(),
    status: ZodSchemas.stringArray(z.nativeEnum(OperationStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(OperationStatus)).optional(),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
    paymentDateLte: ZodSchemas.datetime().optional(),
    paymentDateGte: ZodSchemas.datetime().optional(),
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
