import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantAutoTransferFrequency, MerchantStatus } from '../../../modules/types/merchant/types.ts';
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
  primaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional(),
  secondaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional(),
  logoUrl: z.null().optional(),
});

export const UpdateMerchantBillingBodySchema = z.object({
  email: z.string().email().max(128),
  address: UpdateAddressBodySchema,
}).partial();

export const UpdateMerchantBodySchema = z.object({
  companyName: z.string().max(320),
  tradingName: z.string().max(120),
  personName: z.string().min(1).max(50),
  personEmail: z.string().email().max(128),
  settings: UpdateMerchantSettingsBodySchema,
  billing: UpdateMerchantBillingBodySchema,
  metadata: z.record(z.string().or(z.number().or(z.boolean()))),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export const RestrictUpdateMerchantBodySchema = z.object({
  tierId: ZodSchemas.nanoid(),
  status: z.nativeEnum(MerchantStatus),
  externalId: z.string().max(128),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantBodyDto = z.infer<typeof UpdateMerchantBodySchema>;
export type RestrictUpdateMerchantBodyDto = z.infer<typeof RestrictUpdateMerchantBodySchema>;
