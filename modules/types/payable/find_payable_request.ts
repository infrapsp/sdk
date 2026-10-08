import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableEntity, PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindPayableParamsSchema = BaseParamsSchema;

export const FindPayableQuerySchema = BaseQuerySchema.and(
  z.object({
    transactionId: ZodSchemas.nanoid().optional().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
    transactionRefundId: ZodSchemas.nanoid().optional().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
    transactionSplitId: ZodSchemas.nanoid().optional().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
    transferId: ZodSchemas.nanoid().optional().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
    entity: ZodSchemas.stringArray(z.enum(PayableEntity)).optional().openapi({ description: 'entity to be used to filter', example: 'transfer' }),
    notEntity: ZodSchemas.stringArray(z.enum(PayableEntity)).optional(),
    type: ZodSchemas.stringArray(z.enum(PayableType)).optional().openapi({ example: PayableType.CREDIT }),
    method: z.enum(PayableMethod).optional().openapi({ example: PayableMethod.PIX }),
    status: ZodSchemas.stringArray(z.enum(PayableStatus)).optional().openapi({
      description: 'comma-separated list of payable status',
      example: [PayableStatus.PAID],
    }),
    notStatus: ZodSchemas.stringArray(z.enum(PayableStatus)).optional().openapi({
      description: 'comma-separated list of payable status to not be included',
      example: PayableStatus.PAID,
    }),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', example: SortOrder.DESC }),
    paymentDateLte: ZodSchemas.datetime().optional().openapi({
      description: 'paymentDate less than or equal to',
      example: '2022-01-01T00:00:00.000Z',
    }),
    paymentDateGte: ZodSchemas.datetime().optional().openapi({
      description: 'paymentDate greater than or equal to',
      example: '2022-01-01T00:00:00.000Z',
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

export type FindPayableParamsDto = z.infer<typeof FindPayableParamsSchema>;
export type FindPayableQueryDto = z.infer<typeof FindPayableQuerySchema>;
