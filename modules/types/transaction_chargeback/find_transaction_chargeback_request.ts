import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const FindTransactionChargebackQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional(),
    sortField: z.enum(['createdAt']).default('createdAt'),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
  }),
);

export const FindTransactionChargebackParamsSchema = BaseParamsSchema.and(z.object({
  transactionId: ZodSchemas.nanoid(),
}));

export type FindTransactionChargebackParamsDto = z.infer<typeof FindTransactionChargebackParamsSchema>;
export type FindTransactionChargebackQueryDto = z.infer<typeof FindTransactionChargebackQuerySchema>;
