import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseDashboardQuerySchema } from '../../../modules/types/dashboard/base.ts';

export const FindTransactionStatsQuerySchema = BaseDashboardQuerySchema.and(z.object({
  method: z.nativeEnum(PaymentMethod).optional(),
  status: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
  notStatus: ZodSchemas.stringArray(z.nativeEnum(TransactionStatus)).optional(),
  externalId: z.string().max(128).optional(),
  externalSaleChannel: ZodSchemas.alphanumericWithDash().max(128).optional(),
  preTransactionId: ZodSchemas.nanoid().optional(),
  amountRefundedGte: z.coerce.number().min(0).optional(),
  timeGranularity: z.enum(['date', 'hour']).default('date'),
  groupBy: ZodSchemas.stringArray(z.enum(['timeKey', 'status', 'method'])).default(['timeKey', 'status', 'method']),
}));
