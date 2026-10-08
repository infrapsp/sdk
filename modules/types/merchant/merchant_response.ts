import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  DocumentType,
  MerchantAutoTransferFrequency,
  MerchantBankAccountType,
  MerchantPaymentMethodStatus,
  MerchantStatus,
} from '../../../modules/types/merchant/types.ts';
import { AddressResponseSchema } from '../../../modules/types/address/address_response.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const MerchantAutoTransferSettingsResponseSchema = z.object({
  isEnabled: z.literal(false).openapi({ example: false }),
}).openapi({ title: 'Disabled' }).or(
  z.object({
    isEnabled: z.literal(true).openapi({ example: true }),
    frequency: z.enum(MerchantAutoTransferFrequency).openapi({ example: MerchantAutoTransferFrequency.WEEKLY }),
    day: z.number().min(0).max(6).optional().openapi({ example: 0 }),
    date: z.number().min(1).max(25).optional().openapi({ example: 1 }),
    residualAmount: z.number().int().min(0).openapi({ description: 'amount in cents kept in the balance on every automatic transfer', example: 0 }),
  }).openapi({ title: 'Enabled' }),
);

export const MerchantEmailSettingsResponseSchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']).openapi({ example: 'id' }),
  transactionFieldName: z.enum(['transaction', 'order']).openapi({ example: 'transaction' }),
  isEnabled: z.boolean().openapi({ example: true }),
});

export const MerchantPaymentMethodsSettingsSchema = z.object({
  pix: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.ENABLED }),
  creditCard: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.DISABLED }),
  boleto: z.enum(MerchantPaymentMethodStatus).openapi({ example: MerchantPaymentMethodStatus.ENABLED }),
});

export const MerchantWalletsSettingsResponseSchema = z.object({
  googlePay: z.object({ isEnabled: z.boolean() }),
  applePay: z.object({ isEnabled: z.boolean() }),
});

export const MerchantCreditCardSettingsResponseSchema = z.object({
  threeDS: z.object({
    mode: z.enum(['off', 'optional', 'required']).openapi({ example: 'optional' }),
    optionalThreshold: z.object({
      minAmount: z.number().int().openapi({ description: 'amount in cents from which 3DS is applied when mode is optional', example: 5000 }),
    }),
  }),
  wallets: MerchantWalletsSettingsResponseSchema.optional().openapi({
    description: 'wallets accepted by the merchant',
    example: { googlePay: { isEnabled: true }, applePay: { isEnabled: true } },
  }),
});

export const MerchantSettingsResponseSchema = z.object({
  emailSettings: MerchantEmailSettingsResponseSchema,
  autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
  primaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().nullable().openapi({ example: '#000000' }),
  secondaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().nullable().openapi({ example: '#000000' }),
  softDescriptor: z.string().regex(/^[A-Z0-9]*$/).max(18).optional().nullable().openapi({ example: 'MYSTORE' }),
  paymentMethods: MerchantPaymentMethodsSettingsSchema,
  creditCardSettings: MerchantCreditCardSettingsResponseSchema,
  logoUrl: z.string().nullable().optional().openapi({ example: 'https://example.com/logo.png' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export const MerchantStatusHistoryResponseSchema = z.object({
  status: z.enum(MerchantStatus).openapi({ example: MerchantStatus.ACTIVE }),
  message: z.string().openapi({ example: 'status changed' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export const MerchantBillingResponseSchema = z.object({
  email: z.email().max(128).openapi({ example: 'billing@email.com' }),
  address: AddressResponseSchema,
});

export const MerchantBankAccountResponseSchema = z.object({
  ispb: z.string().openapi({ description: 'ispb of the bank', example: '23527532' }),
  bank: z.string().openapi({ description: 'name of the bank', example: 'BANCO BRADESCO S.A.' }),
  bankBranch: z.string().openapi({ example: '3741' }),
  accountNumber: z.string().openapi({ example: '66736' }),
  accountDigit: z.string().openapi({ example: '9' }),
  accountType: z.enum(MerchantBankAccountType).openapi({ example: MerchantBankAccountType.CHECKING }),
});

export const MerchantSegmentResponseSchema = z.object({
  mccCode: z.string().openapi({ example: '5734' }),
  cnaeCode: z.string().openapi({ example: '4751201' }),
  description: z.string().openapi({ example: 'Comercio varejista especializado de equipamentos de informatica' }),
  isHighRisk: z.boolean().openapi({ example: false }),
});

export const MerchantRegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  status: z.enum(RegistrationStatus).openapi({ example: RegistrationStatus.APPROVED }),
  statusMessage: z.string().openapi({ example: 'status message' }),
  providerData: z.object({
    companyName: z.string().optional().openapi({ example: 'company name' }),
    personName: z.string().optional().openapi({ example: 'person name' }),
    onboardingUrl: z.string().openapi({ example: 'https://example.com/onboarding' }),
    tradingName: z.string().optional().openapi({ example: 'trading name' }),
    previousTierId: ZodSchemas.nanoid().optional().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export const MerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  tierId: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  documentNumber: z.string().openapi({ description: 'cpf or cnpj number without punctuation', example: '88550339997' }),
  documentType: z.enum(DocumentType).openapi({ example: DocumentType.CPF }),
  externalId: z.string().nullable().optional().openapi({ example: 'externalId' }),
  registrationId: ZodSchemas.nanoid().nullable().optional(),
  companyName: z.string().nullable().optional().openapi({ example: 'company name' }),
  personName: z.string().openapi({ example: 'person name' }),
  personEmail: z.email().openapi({ example: 'person@email.com' }),
  segmentId: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  segment: MerchantSegmentResponseSchema,
  registrations: z.array(MerchantRegistrationResponseSchema).optional().openapi({ description: 'onboarding and regularization registrations' }),
  phoneNumber: z.string().nullable().optional().openapi({ example: '+5551999999999' }),
  status: z.enum(MerchantStatus).openapi({ example: MerchantStatus.ACTIVE }),
  statusMessage: z.string().openapi({ example: 'status message' }),
  statusHistory: z.array(MerchantStatusHistoryResponseSchema).openapi({ description: 'history of status changes' }),
  tradingName: z.string().openapi({ example: 'trading name' }),
  url: z.string().openapi({ example: 'https://example.com' }),
  tags: z.array(z.string()).openapi({ example: ['tag-1', 'tag-2'] }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  billing: MerchantBillingResponseSchema,
  settings: MerchantSettingsResponseSchema,
  bankAccount: MerchantBankAccountResponseSchema.nullable().optional(),
  metadata: z.record(z.string(), z.string().or(z.number().or(z.boolean().or(z.date())))).openapi({
    example: { key: 'value' },
    description: 'open field to store information',
  }),
  featureFlags: z.record(z.string(), z.boolean()).openapi({ example: { newCheckout: true }, description: 'feature flags toggled for this merchant' }),
});

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;
export type MerchantBillingResponseDto = z.infer<typeof MerchantBillingResponseSchema>;
export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
