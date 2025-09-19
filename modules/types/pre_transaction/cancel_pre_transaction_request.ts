import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const CancelPreTransactionParamsSchema = BaseParamsSchema;

export type CancelPreTransactionParamsDto = z.infer<typeof CancelPreTransactionParamsSchema>;
