import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindPayableParamsSchema = BaseParamsSchema;

export const FindPayableQuerySchema = z.object({
  entity: z.enum(['transfer', 'transaction', 'transactionSplit', 'transactionRefund']),
  entityId: ZodSchemas.nanoid(),
}).or(
  BaseQuerySchema.and(
    z.object({
      transactionId: ZodSchemas.nanoid().optional(),
      transactionRefundId: ZodSchemas.nanoid().optional(),
      transactionSplitId: ZodSchemas.nanoid().optional(),
      transferId: ZodSchemas.nanoid().optional(),
      type: z.nativeEnum(PayableType).optional(),
      method: z.nativeEnum(PayableMethod).optional(),
      status: ZodSchemas.stringArray(z.nativeEnum(PayableStatus)).optional(),
      notStatus: ZodSchemas.stringArray(z.nativeEnum(PayableStatus)).optional(),
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
  }),
);

export type FindPayableParamsDto = z.infer<typeof FindPayableParamsSchema>;
export type FindPayableQueryDto = z.infer<typeof FindPayableQuerySchema>;
