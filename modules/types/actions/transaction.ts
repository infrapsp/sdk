import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { BaseActionBodySchema, BaseActionResponseSchema } from '../../../modules/types/actions/base.ts';

export enum TransactionAction {
  CREATE_TRANSACTION_ON_PROVIDER = 'create-transaction-on-provider',
}

// create transaction on provider
export const CreateTransactionOnProviderBodySchema = z.object({
  action: z.literal(TransactionAction.CREATE_TRANSACTION_ON_PROVIDER),
  payload: z.object({}),
});

export const BaseTransactionActionBodySchema = z.discriminatedUnion('action', [
  CreateTransactionOnProviderBodySchema,
]);

export const CreateTransactionActionBodySchema = BaseActionBodySchema.and(BaseTransactionActionBodySchema);

export type CreateTransactionActionBodyDto = z.infer<typeof CreateTransactionActionBodySchema>;

// Response
export const TransactionActionResponseSchema = BaseActionResponseSchema.and(BaseTransactionActionBodySchema);

export type TransactionActionResponseDto = z.infer<typeof TransactionActionResponseSchema>;
