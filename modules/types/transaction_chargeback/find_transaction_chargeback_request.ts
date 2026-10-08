import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const FindTransactionChargebackQuerySchema = BaseQuerySchema.and(
  z.object({
    id: ZodSchemas.nanoid().optional().openapi({ description: 'transaction chargeback id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    merchantId: ZodSchemas.nanoid().optional().openapi({ description: 'merchant id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    status: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
      description: 'comma-separated list of transaction chargeback status',
      example: [TransactionChargebackStatus.PENDING],
    }),
    notStatus: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
      description: 'comma-separated list of transaction chargeback status to not be included',
      example: TransactionChargebackStatus.PENDING,
    }),
    sortField: z.enum(['createdAt']).default('createdAt').openapi({ description: 'field to be used to sort the results', default: 'createdAt' }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'order to be used to sort the results', default: SortOrder.DESC }),
  }),
);

export const FindTransactionChargebackParamsSchema = BaseParamsSchema.and(z.object({
  transactionId: ZodSchemas.nanoid().openapi({ description: 'transaction id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
}));

export type FindTransactionChargebackParamsDto = z.infer<typeof FindTransactionChargebackParamsSchema>;
export type FindTransactionChargebackQueryDto = z.infer<typeof FindTransactionChargebackQuerySchema>;
