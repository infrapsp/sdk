import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseDashboardQuerySchema } from '../../../modules/types/dashboard/base.ts';
import { TransactionChargebackStatus } from '../../../modules/types/transaction_chargeback/types.ts';

export const FindTransactionChargebackStatsQuerySchema = BaseDashboardQuerySchema.and(z.object({
  id: ZodSchemas.nanoid().optional(),
  status: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional(),
  notStatus: ZodSchemas.stringArray(z.enum(TransactionChargebackStatus)).optional(),
  timeGranularity: z.enum(['date', 'hour']).default('date'),
  groupBy: ZodSchemas.stringArray(z.enum(['timeKey', 'status'])).default(
    (): ('timeKey' | 'status')[] => ['timeKey', 'status'],
  ),
  aggTimeZone: z.string().regex(/^(\+|-)(0[0-9]|1[0-4]):([0-5][0-9])$/).optional(),
}));
