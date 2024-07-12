import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { MerchantAutoTransferFrequency } from '../../../modules/types/merchant/types.ts';

export const UpdateMerchantParamsSchema = BaseParamsSchema;

export const UpdateMerchantAutoTransferSettingsBodySchema = z.object({
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

export const UpdateMerchantSettingsBodySchema = z.object({
  isEmailNotificationEnabled: z.boolean().optional(),
  autoTransferSettings: UpdateMerchantAutoTransferSettingsBodySchema.optional(),
});

export const UpdateMerchantBodySchema = z.object({
  metadata: z.record(z.string().or(z.number())),
  settings: UpdateMerchantSettingsBodySchema,
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantBodyDto = z.infer<typeof UpdateMerchantBodySchema>;
