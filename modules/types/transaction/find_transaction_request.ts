import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindTransactionQuerySchema = BaseQuerySchema.and(
  z.object({
    method: z.nativeEnum(PaymentMethod).optional(),
    status: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
    search: z.string().max(128).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
    sortField: z.enum(['createdAt', 'updatedAt', 'paidAt', 'refundedAt']).default('createdAt'),
    externalId: z.string().max(128).optional(),
    preTransactionId: ZodSchemas.nanoid().optional(),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
    amountRefundedGte: z.coerce.number().min(0).optional(),
  }),
);

export const FindTransactionParamsSchema = BaseParamsSchema;

export type FindTransactionParamsDto = z.infer<typeof FindTransactionParamsSchema>;
export type FindTransactionQueryDto = z.infer<typeof FindTransactionQuerySchema>;
