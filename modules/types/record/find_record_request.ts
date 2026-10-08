import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { RecordEntity, RecordRequestType, RecordStatus } from '../../../modules/types/record/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const FindRecordQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(RecordStatus)).optional().openapi({
      description: 'comma-separated list of merchant status',
      example: RecordStatus.PENDING,
    }),
    notStatus: ZodSchemas.stringArray(z.enum(RecordStatus)).optional().openapi({
      description: 'comma-separated list of merchant status to not be included',
      example: RecordStatus.APPROVED,
    }),
    merchantId: ZodSchemas.nanoid().optional(),
    merchantStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional().openapi({
      description: 'comma-separated list of merchant status',
      example: MerchantStatus.ACTIVE,
    }),
    merchantNotStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional().openapi({
      description: 'comma-separated list of merchant status to not be included',
      example: MerchantStatus.BLOCKED,
    }),
    merchantTierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional().openapi({
      description: 'comma-separated list of tier ids',
      example: 'tierId1,tierId2',
    }),
    search: z.string().optional().openapi({ description: 'open search string field', example: 'search' }),
    entity: ZodSchemas.stringArray(z.enum(RecordEntity)).optional().openapi({
      description: 'entity to filter the records',
      example: RecordEntity.MERCHANT,
    }),
    entityId: z.string().optional().openapi({ description: 'entity id to filter the records', example: 'b45c82cb74f5466da1ecb' }),
    request: z.string().optional().openapi({ description: 'request to be used to filter the results', example: RecordRequestType.TIER_UPGRADE }),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', default: SortOrder.DESC }),
  }),
);

export type FindRecordQueryDto = z.infer<typeof FindRecordQuerySchema>;
