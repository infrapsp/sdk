import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantAutoTransferFrequency, MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const MerchantAutoTransferSettingsResponseSchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  pixDictKey: z.string(),
  frequency: z.nativeEnum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
  date: z.number().min(1).max(25).optional(),
}));

export const MerchantSettingsResponseSchema = z.object({
  isEmailNotificationEnabled: z.boolean(),
  autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
  updatedAt: z.date(),
});

export const MerchantStatusResponseSchema = z.object({
  status: z.nativeEnum(MerchantStatus),
  message: z.string(),
  createdAt: z.date(),
});

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;

export const MerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
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
  settings: MerchantSettingsResponseSchema,
  metadata: z.record(z.string().or(z.number())),
});

export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
