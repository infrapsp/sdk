import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseResponseSchema } from '../../../modules/types/base/responses.ts';
import { DocumentType, MerchantAutoTransferFrequency, MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const MerchantAutoTransferSettingsResponseSchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  pixDictKey: z.string(),
  frequency: z.nativeEnum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
}));

export const MerchantSettingsResponseSchema = BaseResponseSchema.and(
  z.object({
    isEmailNotificationEnabled: z.boolean(),
    autoTransferSettings: MerchantAutoTransferSettingsResponseSchema,
    createdBy: z.record(z.unknown()),
    updatedBy: z.record(z.unknown()),
  }),
);

export type MerchantSettingsResponseDto = z.infer<typeof MerchantSettingsResponseSchema>;

export const MerchantResponseSchema = BaseResponseSchema.and(
  z.object({
    documentNumber: z.string(),
    documentType: z.nativeEnum(DocumentType),
    externalId: z.string(),
    personName: z.string(),
    responsableName: z.string().optional().nullable(),
    responsableEmail: z.string().email().optional().nullable(),
    segmentId: ZodSchemas.nanoid(),
    status: z.nativeEnum(MerchantStatus),
    tenantId: ZodSchemas.nanoid(),
    tradingName: z.string(),
    url: z.string(),
    createdBy: z.record(z.unknown()),
    settings: MerchantSettingsResponseSchema,
  }),
);

export type MerchantResponseDto = z.infer<typeof MerchantResponseSchema>;
