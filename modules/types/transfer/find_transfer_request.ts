import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodRefines } from '../../../modules/types/zod.ts';

export const FindTransferQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.enumStringArray(TransferStatus).optional(),
    notStatus: ZodSchemas.enumStringArray(TransferStatus).optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt'); // 1 year
  return dto;
});

export const FindTransferParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindTransferQueryDto = z.infer<typeof FindTransferQuerySchema>;
