import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { MerchantRecordStatus } from '../../../modules/types/merchant_record/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const FindMerchantRecordQuerySchema = BaseQuerySchema;

export const FindMerchantRecordRequestQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.nativeEnum(MerchantRecordStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(MerchantRecordStatus)).optional(),
    request: z.string(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
);

export type FindMerchantRecordParamsDto = z.infer<typeof FindMerchantRecordParamsSchema>;
export type FindMerchantRecordQueryDto = z.infer<typeof FindMerchantRecordQuerySchema>;
