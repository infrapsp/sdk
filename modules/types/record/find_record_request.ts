import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { RecordEntity, RecordStatus } from '../../../modules/types/record/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const FindRecordQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(RecordStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(RecordStatus)).optional(),
    merchantId: ZodSchemas.nanoid().optional(),
    merchantStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    merchantNotStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    merchantTierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
    search: z.string().optional(),
    entity: ZodSchemas.stringArray(z.enum(RecordEntity)).optional(),
    entityId: ZodSchemas.nanoid().optional(),
    request: z.string().optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
  }),
);

export type FindRecordQueryDto = z.infer<typeof FindRecordQuerySchema>;
