import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantAutoTransferFrequency, MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { AddressResponseSchema } from '../../../modules/types/address/address_response.ts';

export const MerchantAutoTransferSettingsResponseSchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  frequency: z.nativeEnum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
  date: z.number().min(1).max(25).optional(),
}));

export const MerchantEmailSettingsResponseSchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']),
  transactionFieldName: z.enum(['transaction', 'order']),
  isEnabled: z.boolean(),
});

export const MerchantSettingsResponseSchema = z.object({
  emailSettings: MerchantEmailSettingsResponseSchema,
  autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MerchantStatusResponseSchema = z.object({
  status: z.nativeEnum(MerchantStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const MerchantBillingResponseSchema = z.object({
  email: z.string().email().max(128),
  address: AddressResponseSchema,
});

export const MerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tierId: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.nativeEnum(DocumentType),
  externalId: z.string(),
  companyName: z.string().nullable().optional(),
  personName: z.string(),
  personEmail: z.string().email(),
  segmentId: ZodSchemas.nanoid(),
  status: z.nativeEnum(MerchantStatus),
  statusMessage: z.string(),
  statusHistory: z.array(MerchantStatusResponseSchema),
  tradingName: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  billing: MerchantBillingResponseSchema,
  settings: MerchantSettingsResponseSchema,
  metadata: z.record(z.string().or(z.number())),
});

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;
export type MerchantBillingResponseDto = z.infer<typeof MerchantBillingResponseSchema>;
export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
