import { z } from 'zod';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';

export enum MerchantAction {
  CREATE_MERCHANT_ON_PROVIDER = 'create-merchant-on-provider',
  UPDATE_MERCHANT_ON_PROVIDER = 'update-merchant-on-provider',
}

// create merchant on provider
export const CreateMerchantOnProviderBodySchema = z.object({
  action: z.literal(MerchantAction.CREATE_MERCHANT_ON_PROVIDER),
  payload: z.object({ name: z.string() }),
});

// update merchant on provider
export const UpdateMerchantOnProviderBodySchema = z.object({
  action: z.literal(MerchantAction.UPDATE_MERCHANT_ON_PROVIDER),
  payload: z.object({ status: z.string() }),
});

// Worker
export const CreateMerchantOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateMerchantOnProviderBodySchema);
