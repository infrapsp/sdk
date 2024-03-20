import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { BaseActionBodySchema, BaseActionResponseSchema } from '../../../modules/types/actions/base.ts';

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

export const BaseMerchantActionBodySchema = z.discriminatedUnion('action', [
  CreateMerchantOnProviderBodySchema,
  UpdateMerchantOnProviderBodySchema,
]);

export const CreateMerchantActionBodySchema = BaseActionBodySchema.and(BaseMerchantActionBodySchema);

export type CreateMerchantActionBodyDto = z.infer<typeof CreateMerchantActionBodySchema>;

// Response
export const MerchantActionResponseSchema = BaseActionResponseSchema.and(BaseMerchantActionBodySchema);

export type MerchantActionResponseDto = z.infer<typeof MerchantActionResponseSchema>;
