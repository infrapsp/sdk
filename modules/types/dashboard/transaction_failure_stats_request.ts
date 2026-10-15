import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseDashboardQuerySchema } from '../../../modules/types/dashboard/base.ts';

export const FindTransactionFailureStatsQuerySchema = BaseDashboardQuerySchema.and(z.object({
  merchantId: ZodSchemas.nanoid().optional(),
}));
