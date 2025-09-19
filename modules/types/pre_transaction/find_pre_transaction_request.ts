import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';

export const FindPreTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(PreTransactionStatus)).optional(),
    search: z.string().max(128).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(PreTransactionStatus)).optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    externalId: z.string().max(128).optional(),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
  }),
);

export const FindPreTransactionParamsSchema = BaseParamsSchema;

export type FindPreTransactionParamsDto = z.infer<typeof FindPreTransactionParamsSchema>;
export type FindPreTransactionQueryDto = z.infer<typeof FindPreTransactionQuerySchema>;
