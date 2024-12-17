import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

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
);

export const FindMerchantParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindMerchantQueryDto = z.infer<typeof FindMerchantQuerySchema>;
