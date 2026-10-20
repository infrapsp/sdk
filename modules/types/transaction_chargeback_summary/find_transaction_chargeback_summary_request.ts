import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const FindTransactionChargebackSummaryQuerySchema = BaseQuerySchema.and(
  z.object({
    id: ZodSchemas.nanoid().optional().openapi({
      description: 'transaction chargeback summary id (same as the transaction id)',
      example: 'KaEVV7UOJOzB2QH2zPrkz',
    }),
    merchantId: ZodSchemas.nanoid().optional().openapi({ description: 'merchant id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    status: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
      description: 'comma-separated list of transaction chargeback summary status',
      example: [TransactionChargebackStatus.WAITING_RESPONSE],
    }),
    notStatus: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
      description: 'comma-separated list of transaction chargeback summary status to not be included',
      example: [TransactionChargebackStatus.CANCELED],
    }),
    sortField: z.enum(['createdAt']).default('createdAt').openapi({ description: 'field to be used to sort the results', default: 'createdAt' }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'order to be used to sort the results', default: SortOrder.DESC }),
  }),
);

export const FindTransactionChargebackSummaryParamsSchema = BaseParamsSchema;

export type FindTransactionChargebackSummaryQueryDto = z.infer<typeof FindTransactionChargebackSummaryQuerySchema>;
export type FindTransactionChargebackSummaryParamsDto = z.infer<typeof FindTransactionChargebackSummaryParamsSchema>;
