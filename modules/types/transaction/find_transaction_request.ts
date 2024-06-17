import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    method: z.nativeEnum(PaymentMethod).optional(),
    status: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
    sortField: z.enum(['createdAt', 'updatedAt', 'paidAt', 'refundedAt']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt');
  return dto;
});

export const FindTransactionParamsSchema = BaseParamsSchema;

export type FindTransactionParamsDto = z.infer<typeof FindTransactionParamsSchema>;
export type FindTransactionQueryDto = z.infer<typeof FindTransactionQuerySchema>;
