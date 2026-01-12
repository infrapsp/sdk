import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const FindMerchantQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional(),
    tierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
    merchantIds: z.string().transform((v) => (v ?? '').split(',')).optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
    search: z.string().optional(),
    tags: ZodSchemas.stringArray(z.string().regex(/^[a-zA-Z0-9-]+$/).max(32)).optional(),
  }),
);

export const FindMerchantParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindMerchantQueryDto = z.infer<typeof FindMerchantQuerySchema>;
