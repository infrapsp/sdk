import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import {
  MerchantAutoTransferFrequency,
  MerchantBankAccountType,
  MerchantPaymentMethodStatus,
  MerchantStatus,
} from '../../../modules/types/merchant/types.ts';
import { UpdateAddressBodySchema } from '../../../modules/types/address/update_address_request.ts';

export const UpdateMerchantParamsSchema = BaseParamsSchema;

export const UpdateMerchantAutoTransferSettingsBodySchema = z.object({
  isEnabled: z.literal(false).openapi({ example: false }),
}).openapi({ title: 'Disabled' }).or(
  z.object({
    isEnabled: z.literal(true).openapi({ example: true }),
    frequency: z.enum(MerchantAutoTransferFrequency).openapi({ example: MerchantAutoTransferFrequency.WEEKLY }),
    day: z.number().min(0).max(6).optional().openapi({ example: 0 }),
    date: z.number().min(1).max(25).optional().openapi({ example: 1 }),
    residualAmount: z.number().int().min(0).default(0).openapi({
      description: 'amount in cents kept in the balance on every automatic transfer',
      example: 0,
    }),
  }).openapi({ title: 'Enabled' }),
).transform((dto, ctx) => {
  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.WEEKLY && !dto.day) {
    ZodHelpers.issue(ctx, 'day', 'Required for autoTransferFrequency weekly.');
  }

  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.MONTLHY && !dto.date) {
    ZodHelpers.issue(ctx, 'date', 'Required for autoTransferFrequency monthly.');
  }

  return dto;
});

export const UpdateMerchantEmailSettingsBodySchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']).optional().openapi({ example: 'id' }),
  transactionFieldName: z.enum(['transaction', 'order']).optional().openapi({ example: 'transaction' }),
  isEnabled: z.boolean().optional().openapi({ example: true }),
});

export const UpdateMerchantCreditCardSettingsBodySchema = z.object({
  threeDS: z.object({
    mode: z.enum(['off', 'optional', 'required']).openapi({ example: 'optional' }),
    optionalThreshold: z.object({
      minAmount: z.number().int().nonnegative().openapi({
        description: 'amount in cents from which 3DS is applied when mode is optional',
        example: 5000,
      }),
    }),
  }).optional(),
  wallets: z.object({
    googlePay: z.object({ isEnabled: z.boolean() }),
    applePay: z.object({ isEnabled: z.boolean() }),
  }).optional().openapi({
    description: 'wallets accepted by the merchant. both must be sent together',
    example: { googlePay: { isEnabled: true }, applePay: { isEnabled: true } },
  }),
});

export const UpdateMerchantSettingsBodySchema = z.object({
  emailSettings: UpdateMerchantEmailSettingsBodySchema.optional(),
  autoTransferSettings: UpdateMerchantAutoTransferSettingsBodySchema.optional(),
  creditCardSettings: UpdateMerchantCreditCardSettingsBodySchema.optional(),
  softDescriptor: z.string().regex(/^[A-Z0-9]*$/).max(18).optional().openapi({ example: 'MYSTORE' }),
  primaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().openapi({ example: '#000000' }),
  secondaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().openapi({ example: '#000000' }),
});

export const UpdateMerchantBankAccountBodySchema = z.object({
  ispb: z.string().min(1).max(8).openapi({ description: 'ispb of the bank', example: '23527532' }),
  bankBranch: z.string().min(1).max(4).openapi({ example: '3741' }),
  accountNumber: z.string().min(1).max(15).openapi({ example: '66736' }),
  accountDigit: z.string().min(1).max(1).openapi({ example: '9' }),
  accountType: z.enum(MerchantBankAccountType).openapi({ example: MerchantBankAccountType.CHECKING }),
}).transform((dto, ctx) => {
  if ([MerchantBankAccountType.CHECKING, MerchantBankAccountType.SAVINGS].includes(dto.accountType) && dto.accountNumber.length > 13) {
    ZodHelpers.issue(ctx, 'accountNumber', 'Account number must be at most 13 characters for checking and savings accounts.');
  }
  return dto;
});

export const UpdateMerchantBillingBodySchema = z.object({
  email: z.email().max(128).openapi({ example: 'billing@email.com' }),
  address: UpdateAddressBodySchema,
}).partial();

export const UpdateMerchantBodySchema = z.object({
  companyName: z.string().max(320).openapi({ example: 'company name' }),
  tradingName: z.string().max(120).openapi({ example: 'trading name' }),
  personName: z.string().min(1).max(50).openapi({ example: 'person name' }),
  personEmail: z.email().max(128).openapi({ example: 'person@email.com' }),
  phoneNumber: ZodSchemas.phone().openapi({ example: '+5551999999999' }),
  externalId: z.string().max(128).openapi({ example: 'externalId' }),
  settings: UpdateMerchantSettingsBodySchema,
  billing: UpdateMerchantBillingBodySchema,
  bankAccount: UpdateMerchantBankAccountBodySchema,
  metadata: z.record(z.string(), z.string().or(z.number().or(z.boolean()))).openapi({
    example: { key: 'value' },
    description: 'open field to store information',
  }),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export const RestrictMerchantPaymentMethodsSettingsSchema = z.object({
  pix: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.ENABLED }),
  creditCard: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.ENABLED }),
  boleto: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.ENABLED }),
}).partial();

export const RestrictUpdateMerchantSettingsBodySchema = z.object({
  paymentMethods: RestrictMerchantPaymentMethodsSettingsSchema,
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export const RestrictUpdateMerchantBodySchema = z.object({
  tierId: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  status: z.enum(MerchantStatus).openapi({ example: MerchantStatus.ACTIVE }),
  externalId: z.string().max(128).openapi({ example: 'externalId' }),
  settings: RestrictUpdateMerchantSettingsBodySchema,
  tags: z.array(z.string().regex(/^[a-zA-Z0-9-]+$/).max(32)).max(5).openapi({ example: ['tag-1', 'tag-2'] }),
  metadata: z.record(z.string(), z.string().or(z.number().or(z.boolean()))).openapi({
    example: { key: 'value' },
    description: 'open field to store information',
  }),
  featureFlags: z.record(z.string(), z.boolean()).openapi({ example: { newCheckout: true }, description: 'feature flags toggled for this merchant' }),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantBodyDto = z.infer<typeof UpdateMerchantBodySchema>;
export type RestrictUpdateMerchantBodyDto = z.infer<typeof RestrictUpdateMerchantBodySchema>;
