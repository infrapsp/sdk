import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseDashboardQuerySchema } from '../../../modules/types/dashboard/base.ts';

export const FindTransactionStatsQuerySchema = BaseDashboardQuerySchema.and(z.object({
  method: ZodSchemas.stringArray(z.enum(PaymentMethod)).optional().openapi({ description: 'payment method', example: PaymentMethod.PIX }),
  search: z.string().max(128).optional().openapi({ description: 'open search string field', example: 'search' }),
  merchantId: ZodSchemas.nanoid().optional(),
  status: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional().openapi({
    description: 'comma-separated list of transaction status',
    example: [TransactionStatus.PAID],
  }),
  statusMessage: ZodSchemas.stringArray(z.string().max(128)).optional(),
  notStatus: ZodSchemas.stringArray(z.enum(TransactionStatus)).optional().openapi({
    description: 'comma-separated list of transaction status to not be included',
    example: TransactionStatus.PAID,
  }),
  externalId: z.string().max(128).optional().openapi({ description: 'external id', example: 'my_ext_id' }),
  externalSaleChannel: z.string().regex(/^[^\s]+$/).max(128).optional(),
  preTransactionId: ZodSchemas.nanoid().optional().openapi({ description: 'pre transaction id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  amountRefundedGte: z.coerce.number().min(0).optional().openapi({ description: 'amount refunded greater than or equal to', example: 100 }),
  amountRefundedLte: z.coerce.number().min(0).optional().openapi({ description: 'amount refunded greater than or equal to', example: 100 }),
  amountChargedbackGte: z.coerce.number().min(0).optional(),
  amountChargedbackLte: z.coerce.number().min(0).optional(),
  timeGranularity: z.enum(['date', 'hour']).default('date').openapi({
    description: 'Grouping by date will return one bucket per day, grouping by hour will return one bucket per hour value',
    example: 'hour',
  }),
  groupBy: ZodSchemas.stringArray(z.enum(['timeKey', 'status', 'method'])).default(
    (): ('timeKey' | 'status' | 'method')[] => ['timeKey', 'status', 'method'],
  ).openapi({ description: 'comma-separated list group by fields for the stats', example: 'timeKey,status,method' }),
  aggTimeZone: z.string().regex(/^(\+|-)(0[0-9]|1[0-4]):([0-5][0-9])$/).optional().openapi({
    description: 'timezone for the aggregation time buckets in ±HH:MM format',
    example: '-03:00',
  }),
}));
