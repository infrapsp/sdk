import { z } from 'hono/zod-openapi';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';

export enum TransferAction {
  CREATE_TRANSFER_ON_PROVIDER = 'create-transfer-on-provider',
}

// create transfer on provider
export const CreateTransferOnProviderBodySchema = z.object({
  action: z.literal(TransferAction.CREATE_TRANSFER_ON_PROVIDER),
  payload: z.object({}),
});

// Worker
export const CreateTransferOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateTransferOnProviderBodySchema);
export type CreateTransferOnProviderWorkerBodyDto = z.infer<typeof CreateTransferOnProviderWorkerBodySchema>;
