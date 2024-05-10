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
}));

export const MerchantSettingsResponseSchema = z.object({
  isEmailNotificationEnabled: z.boolean(),
  autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
  updatedAt: z.date(),
});

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;

export const MerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.nativeEnum(DocumentType),
  externalId: z.string(),
  personName: z.string(),
  responsableName: z.string().optional().nullable(),
  responsableEmail: z.string().email().optional().nullable(),
  segmentId: ZodSchemas.nanoid(),
  status: z.nativeEnum(MerchantStatus),
  statusMessage: z.string(),
  tenantId: ZodSchemas.nanoid(),
  tradingName: z.string(),
  url: z.string(),
  changedBy: z.record(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  settings: MerchantSettingsResponseSchema,
  metadata: z.record(z.string().or(z.number())),
});

export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
