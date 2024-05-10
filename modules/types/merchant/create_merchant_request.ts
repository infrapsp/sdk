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
})).transform((dto, ctx) => {
  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.WEEKLY && !dto.day) {
    ZodHelpers.issue(ctx, 'day', 'Required for autoTransferFrequency weekly.');
  }
  return dto;
});

export const CreateMerchantSettingsBodySchema = z.object({
  isEmailNotificationEnabled: z.boolean().optional(),
  autoTransferSettings: CreateMerchantAutoTransferSettingsBodySchema.optional(),
});

export type CreateMerchantSettingsBodyDto = z.infer<typeof CreateMerchantSettingsBodySchema>;

export const CreateMerchantBodySchema = z.object({
  documentNumber: ZodSchemas.document(),
  documentType: z.nativeEnum(DocumentType),
  externalId: z.string(),
  personName: z.string(),
  segmentId: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  responsableName: z.string().optional(),
  responsableEmail: z.string().email().optional(),
  tradingName: z.string(),
  url: z.string(),
  settings: CreateMerchantSettingsBodySchema.optional().default({}),
}).transform((dto, ctx) => {
  for (const key of ['responsableName', 'responsableEmail'] as const) {
    if (dto.documentType === DocumentType.CNPJ && !dto[key]) {
      ZodHelpers.issue(ctx, key, 'Required for personType company.');
    }
  }

  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  return dto;
});

export type CreateMerchantBodyDto = z.infer<typeof CreateMerchantBodySchema>;
