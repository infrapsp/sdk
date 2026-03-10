import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantAutoTransferFrequency, MerchantPaymentMethodStatus, MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { AddressResponseSchema } from '../../../modules/types/address/address_response.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const MerchantAutoTransferSettingsResponseSchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  frequency: z.enum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
  date: z.number().min(1).max(25).optional(),
  residualAmount: z.number().int().min(0),
}));

export const MerchantEmailSettingsResponseSchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']),
  transactionFieldName: z.enum(['transaction', 'order']),
  isEnabled: z.boolean(),
});

export const MerchantPaymentMethodsSettingsSchema = z.object({
  pix: z.enum(MerchantPaymentMethodStatus),
  creditCard: z.enum(MerchantPaymentMethodStatus),
});

export const MerchantSettingsResponseSchema = z.object({
  emailSettings: MerchantEmailSettingsResponseSchema,
  autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
  primaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().nullable(),
  secondaryColor: z.string().max(7).regex(/^#[0-9A-F]{6}$/).optional().nullable(),
  softDescriptor: z.string().regex(/^[A-Z0-9]*$/).max(18).optional().nullable(),
  paymentMethods: MerchantPaymentMethodsSettingsSchema,
  logoUrl: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MerchantStatusHistoryResponseSchema = z.object({
  status: z.enum(MerchantStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const MerchantBillingResponseSchema = z.object({
  email: z.email().max(128),
  address: AddressResponseSchema,
});

export const MerchantSegmentResponseSchema = z.object({
  mccCode: z.string(),
  cnaeCode: z.string(),
  description: z.string(),
  isHighRisk: z.boolean(),
});

export const MerchantRegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  status: z.enum(RegistrationStatus),
  statusMessage: z.string(),
  providerData: z.object({
    companyName: z.string().optional(),
    personName: z.string().optional(),
    onboardingUrl: z.string(),
    tradingName: z.string().optional(),
    previousTierId: ZodSchemas.nanoid().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tierId: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.enum(DocumentType),
  externalId: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  personName: z.string(),
  personEmail: z.email(),
  segmentId: ZodSchemas.nanoid(),
  segment: MerchantSegmentResponseSchema,
  registrations: z.array(MerchantRegistrationResponseSchema).optional(),
  phoneNumber: z.string().nullable().optional(),
  status: z.enum(MerchantStatus),
  statusMessage: z.string(),
  statusHistory: z.array(MerchantStatusHistoryResponseSchema),
  tradingName: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  billing: MerchantBillingResponseSchema,
  settings: MerchantSettingsResponseSchema,
  metadata: z.record(z.string(), z.string().or(z.number().or(z.boolean()))),
});

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;
export type MerchantBillingResponseDto = z.infer<typeof MerchantBillingResponseSchema>;
export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
