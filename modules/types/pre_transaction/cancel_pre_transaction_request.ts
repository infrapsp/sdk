import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';

export const CancelPreTransactionParamsSchema = BaseParamsSchema;

export type CancelPreTransactionParamsDto = z.infer<typeof CancelPreTransactionParamsSchema>;
