import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const CancelPreTransactionParamsSchema = BaseParamsSchema;

export type CancelPreTransactionParamsDto = z.infer<typeof CancelPreTransactionParamsSchema>;
