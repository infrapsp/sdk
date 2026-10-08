import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    method: ZodSchemas.stringArray(z.enum(PaymentMethod)).optional().openapi({ description: 'payment method', example: PaymentMethod.PIX }),
    status: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional().openapi({
      description: 'comma-separated list of transaction status',
      example: [TransactionStatus.PAID],
    }),
    search: z.string().max(128).optional().openapi({ description: 'open search string field', example: 'search' }),
    notStatus: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional().openapi({
      description: 'comma-separated list of transaction status to not be included',
      example: TransactionStatus.PAID,
    }),
    sortField: z.enum(['createdAt', 'updatedAt', 'paidAt', 'refundedAt']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    externalId: z.string().max(128).optional().openapi({ description: 'external id', example: 'my_ext_id' }),
    externalSaleChannel: z.string().regex(/^[^\s]+$/).max(128).optional().optional(),
    preTransactionId: ZodSchemas.nanoid().optional().openapi({ description: 'pre transaction id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', default: SortOrder.DESC }),
    amountRefundedGte: z.coerce.number().min(0).optional().openapi({ description: 'amount refunded greater than or equal to', example: 100 }),
    amountRefundedLte: z.coerce.number().min(0).optional().openapi({ description: 'amount refunded less than or equal to', example: 100 }),
    amountChargedbackGte: z.coerce.number().min(0).optional(),
    amountChargedbackLte: z.coerce.number().min(0).optional(),
  }),
);

export const FindTransactionParamsSchema = BaseParamsSchema;

export type FindTransactionParamsDto = z.infer<typeof FindTransactionParamsSchema>;
export type FindTransactionQueryDto = z.infer<typeof FindTransactionQuerySchema>;
