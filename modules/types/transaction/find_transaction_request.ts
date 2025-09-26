import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    method: z.enum(PaymentMethod).optional(),
    status: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional(),
    search: z.string().max(128).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional(),
    sortField: z.enum(['createdAt', 'updatedAt', 'paidAt', 'refundedAt']).default('createdAt'),
    externalId: z.string().max(128).optional(),
    externalSaleChannel: ZodSchemas.alphanumericWithDash().max(128).optional(),
    preTransactionId: ZodSchemas.nanoid().optional(),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
    amountRefundedGte: z.coerce.number<number>().min(0).optional(),
    amountRefundedLte: z.coerce.number<number>().min(0).optional(),
    amountChargedbackGte: z.coerce.number<number>().min(0).optional(),
    amountChargedbackLte: z.coerce.number<number>().min(0).optional(),
  }),
);

export const FindTransactionParamsSchema = BaseParamsSchema;

export type FindTransactionParamsDto = z.infer<typeof FindTransactionParamsSchema>;
export type FindTransactionQueryDto = z.infer<typeof FindTransactionQuerySchema>;
