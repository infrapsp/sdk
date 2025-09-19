import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { MerchantRecordStatus } from '../../../modules/types/merchant_record/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const FindMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const FindMerchantRecordQuerySchema = BaseQuerySchema;

export const FindMerchantRecordRequestQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(MerchantRecordStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(MerchantRecordStatus)).optional(),
    merchantStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    merchantNotStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    merchantTierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
    search: z.string().optional(),
    request: z.string(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
  }),
);

export type FindMerchantRecordParamsDto = z.infer<typeof FindMerchantRecordParamsSchema>;
export type FindMerchantRecordQueryDto = z.infer<typeof FindMerchantRecordQuerySchema>;
