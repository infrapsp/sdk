import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';

export const FindMerchantQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.nativeEnum(MerchantStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(MerchantStatus)).optional(),
    tierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
    merchantIds: z.string().transform((v) => (v ?? '').split(',')).optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
    search: z.string().optional(),
  }),
).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt'); // 1 year
  return dto;
});

export const FindMerchantParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindMerchantQueryDto = z.infer<typeof FindMerchantQuerySchema>;
