import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export const CancelPreTransactionParamsSchema = BaseParamsSchema;

export type CancelPreTransactionParamsDto = z.infer<typeof CancelPreTransactionParamsSchema>;
