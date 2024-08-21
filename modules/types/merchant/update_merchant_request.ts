import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantAutoTransferFrequency } from '../../../modules/types/merchant/types.ts';
import { UpdateAddressBodySchema } from '../../../modules/types/address/update_address_request.ts';

export const UpdateMerchantParamsSchema = BaseParamsSchema;

export const UpdateMerchantAutoTransferSettingsBodySchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  frequency: z.nativeEnum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
  date: z.number().min(1).max(25).optional(),
})).transform((dto, ctx) => {
  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.WEEKLY && !dto.day) {
    ZodHelpers.issue(ctx, 'day', 'Required for autoTransferFrequency weekly.');
  }

  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.MONTLHY && !dto.date) {
    ZodHelpers.issue(ctx, 'date', 'Required for autoTransferFrequency monthly.');
  }

  return dto;
});

export const UpdateMerchantEmailSettingsBodySchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']).optional(),
  transactionFieldName: z.enum(['transaction', 'order']).optional(),
  isEnabled: z.boolean().optional(),
});

export const UpdateMerchantSettingsBodySchema = z.object({
  emailSettings: UpdateMerchantEmailSettingsBodySchema.optional(),
  autoTransferSettings: UpdateMerchantAutoTransferSettingsBodySchema.optional(),
});

export const UpdateMerchantBillingBodySchema = z.object({
  email: z.string().email().max(128),
  address: UpdateAddressBodySchema,
}).partial();

export const UpdateMerchantBodySchema = z.object({
  companyName: z.string().max(320),
  tradingName: z.string().max(120),
  personName: ZodSchemas.name(),
  personEmail: z.string().email().max(128),
  settings: UpdateMerchantSettingsBodySchema,
  billing: UpdateMerchantBillingBodySchema,
  metadata: z.record(z.string().or(z.number())),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantBodyDto = z.infer<typeof UpdateMerchantBodySchema>;
