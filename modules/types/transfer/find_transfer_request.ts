import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const FindTransferQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(TransferStatus)).optional().openapi({
      description: 'comma-separated list of transfer status',
      example: TransferStatus.PROCESSING,
    }),
    notStatus: ZodSchemas.stringArray(z.enum(TransferStatus)).optional().openapi({
      description: 'comma-separated list of transfer status to not be included',
      example: TransferStatus.PROCESSING,
    }),
    isAutoTransfer: ZodSchemas.stringBoolean().optional().openapi({ example: 'true', type: 'boolean' }),
    account: z.enum(BalanceAccountType).optional(),
    search: z.string().max(128).optional().openapi({ description: 'open search string field', example: 'search' }),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', example: SortOrder.DESC }),
  }),
);

export const FindTransferParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindTransferQueryDto = z.infer<typeof FindTransferQuerySchema>;
