import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const FindTransactionSplitParamsSchema = BaseParamsSchema;

export type FindTransactionSplitParamsDto = z.infer<typeof FindTransactionSplitParamsSchema>;
