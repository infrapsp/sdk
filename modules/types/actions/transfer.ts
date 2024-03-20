import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { BaseActionBodySchema, BaseActionResponseSchema } from '../../../modules/types/actions/base.ts';

export enum TransferAction {
  CREATE_TRANSFER_ON_PROVIDER = 'create-transfer-on-provider',
}

// create transfer on provider
export const CreateTransferOnProviderBodySchema = z.object({
  action: z.literal(TransferAction.CREATE_TRANSFER_ON_PROVIDER),
  payload: z.object({}),
});

export const BaseTransferActionBodySchema = z.discriminatedUnion('action', [
  CreateTransferOnProviderBodySchema,
]);

export const CreateTransferActionBodySchema = BaseActionBodySchema.and(BaseTransferActionBodySchema);

export type CreateTransferActionBodyDto = z.infer<typeof CreateTransferActionBodySchema>;

// Response
export const TransferActionResponseSchema = BaseActionResponseSchema.and(BaseTransferActionBodySchema);

export type TransferActionResponseDto = z.infer<typeof TransferActionResponseSchema>;
