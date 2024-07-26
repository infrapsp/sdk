import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantAutoTransferFrequency } from '../../../modules/types/merchant/types.ts';
import { ZodHelpers, ZodRefines } from '../../../modules/types/zod.ts';

export const CreateMerchantAutoTransferSettingsBodySchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  pixDictKey: z.string(),
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

export const CreateMerchantSettingsBodySchema = z.object({
  isEmailNotificationEnabled: z.boolean().optional(),
  autoTransferSettings: CreateMerchantAutoTransferSettingsBodySchema.optional(),
});

export const CreateMerchantBillingBodySchema = z.object({
  email: z.string().email().max(128),
  address: z.object({
    line1: z.string().max(200),
    line2: z.string().max(100).optional(),
    number: ZodSchemas.alphanumeric().max(10),
    neighborhood: z.string().max(100),
    zipCode: ZodSchemas.numeric().max(15),
  }),
});

export const CreateMerchantBodySchema = z.object({
  tenantId: ZodSchemas.nanoid().optional(),
  documentNumber: ZodSchemas.document(),
  documentType: z.nativeEnum(DocumentType),
  externalId: z.string().max(128).optional(),
  segmentId: ZodSchemas.nanoid(),
  companyName: ZodSchemas.companyName().optional(),
  personName: ZodSchemas.name(),
  personEmail: z.string().email().max(128),
  tradingName: z.string().max(120),
  billing: CreateMerchantBillingBodySchema,
  url: z.string(),
  settings: CreateMerchantSettingsBodySchema.optional().default({}),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export type CreateMerchantBillingBodyDto = z.infer<typeof CreateMerchantBillingBodySchema>;
export type CreateMerchantSettingsBodyDto = z.infer<typeof CreateMerchantSettingsBodySchema>;
export type CreateMerchantBodyDto = z.infer<typeof CreateMerchantBodySchema>;
