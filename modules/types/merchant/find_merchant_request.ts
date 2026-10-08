import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const FindMerchantQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().optional().openapi({
    description: 'filter by createdAt less than or equal to',
    example: '2021-01-02T02:59:59.999Z',
  }),
  createdAtGte: ZodSchemas.datetime().optional().openapi({
    description: 'filter by createdAt greater than or equal to',
    example: '2021-01-01T03:00:00.000Z',
  }),
  page: z.coerce.number().positive().int().default(1).openapi({ description: 'page number', example: 1 }),
  pageSize: z.coerce.number().positive().int().max(1000).default(10).openapi({ description: 'number of items per page', example: 10 }),
  status: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional().openapi({
    description: 'comma-separated list of merchant status',
    example: [MerchantStatus.ACTIVE],
  }),
  notStatus: ZodSchemas.stringArray(z.enum(MerchantStatus)).optional().openapi({
    description: 'comma-separated list of merchant status to not be included',
    example: MerchantStatus.BLOCKED,
  }),
  tierIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional().openapi({
    description: 'comma-separated list of tier ids',
    example: 'tierId1,tierId2',
  }),
  registrationStatus: ZodSchemas.stringArray(z.enum(RegistrationStatus)).optional(),
  registrationStartedAtLte: ZodSchemas.datetime().optional(),
  registrationStartedAtGte: ZodSchemas.datetime().optional(),
  merchantIds: z.string().transform((v) => (v ?? '').split(',')).optional().openapi({
    description: 'comma-separated list of merchant ids',
    example: 'merchantId1,merchantId2',
  }),
  sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt').openapi({
    description: 'field to be used to sort the results',
    default: 'createdAt',
  }),
  sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', default: SortOrder.DESC }),
  search: z.string().optional().openapi({ description: 'open search string field', example: 'search' }),
  tags: ZodSchemas.stringArray(z.string().regex(/^[a-zA-Z0-9-]+$/).max(32)).optional().openapi({
    description: 'comma-separated list of tags to filter merchants',
    example: 'tag1,tag2',
  }),
});

export const FindMerchantParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindMerchantQueryDto = z.infer<typeof FindMerchantQuerySchema>;
