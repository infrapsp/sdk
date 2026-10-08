import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';

export const FindPreTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(PreTransactionStatus)).optional().openapi({
      description: 'comma-separated list of pre transaction status',
      example: [PreTransactionStatus.ACTIVE],
    }),
    search: z.string().max(128).optional().openapi({ description: 'open search string field', example: 'search' }),
    notStatus: ZodSchemas.stringArray(z.enum(PreTransactionStatus)).optional().openapi({
      description: 'comma-separated list of pre transaction status to not be included',
      example: PreTransactionStatus.ACTIVE,
    }),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    externalId: z.string().max(128).optional().openapi({ description: 'external id', example: 'my_ext_id' }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', example: SortOrder.DESC }),
  }),
);

export const FindPreTransactionParamsSchema = BaseParamsSchema;

export type FindPreTransactionParamsDto = z.infer<typeof FindPreTransactionParamsSchema>;
export type FindPreTransactionQueryDto = z.infer<typeof FindPreTransactionQuerySchema>;
