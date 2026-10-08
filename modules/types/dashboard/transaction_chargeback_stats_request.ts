import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseDashboardQuerySchema } from '../../../modules/types/dashboard/base.ts';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const FindTransactionChargebackStatsQuerySchema = BaseDashboardQuerySchema.and(z.object({
  id: ZodSchemas.nanoid().optional().openapi({ description: 'id', example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  status: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
    description: 'comma-separated list of transaction chargeback status',
    example: [TransactionChargebackStatus.LOST],
  }),
  merchantId: ZodSchemas.nanoid().optional(),
  notStatus: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional().openapi({
    description: 'comma-separated list of transaction chargeback status to not be included',
    example: TransactionChargebackStatus.WON,
  }),
  timeGranularity: z.enum(['date', 'hour']).default('date'),
  groupBy: ZodSchemas.stringArray(z.enum(['timeKey', 'status'])).default(
    (): ('timeKey' | 'status')[] => ['timeKey', 'status'],
  ).openapi({ description: 'comma-separated list group by fields for the stats', example: 'timeKey,status' }),
  aggTimeZone: z.string().regex(/^(\+|-)(0[0-9]|1[0-4]):([0-5][0-9])$/).optional().openapi({
    description: 'timezone for the aggregation time buckets in ±HH:MM format',
    example: '-03:00',
  }),
}));
