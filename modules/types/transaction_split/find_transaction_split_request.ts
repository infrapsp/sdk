import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const FindTransactionSplitParamsSchema = BaseParamsSchema;

export type FindTransactionSplitParamsDto = z.infer<typeof FindTransactionSplitParamsSchema>;
