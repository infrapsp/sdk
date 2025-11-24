import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantAutoTransferFrequency, MerchantPaymentMethodStatus } from '../../../modules/types/merchant/types.ts';
import { ZodHelpers, ZodRefines } from '../../../modules/types/zod.ts';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';

export const CreateMerchantAutoTransferSettingsBodySchema = z.object({
  isEnabled: z.literal(false),
}).or(z.object({
  isEnabled: z.literal(true),
  frequency: z.enum(MerchantAutoTransferFrequency),
  day: z.number().min(0).max(6).optional(),
  date: z.number().min(1).max(25).optional(),
  residualAmount: z.number().int().min(0).default(0),
})).transform((dto, ctx) => {
  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.WEEKLY && !dto.day) {
    ZodHelpers.issue(ctx, 'day', 'Required for autoTransferFrequency weekly.');
  }

  if (dto.isEnabled && dto.frequency === MerchantAutoTransferFrequency.MONTLHY && !dto.date) {
    ZodHelpers.issue(ctx, 'date', 'Required for autoTransferFrequency monthly.');
  }

  return dto;
});

export const CreateMerchantEmailSettingsBodySchema = z.object({
  transactionFieldId: z.enum(['id', 'externalId']).optional(),
  transactionFieldName: z.enum(['transaction', 'order']).optional(),
  isEnabled: z.boolean().optional(),
});

export const CreateMerchantPaymentMethodsSettingsSchema = z.object({
  [PaymentMethod.PIX]: z.enum(MerchantPaymentMethodStatus),
  [PaymentMethod.CREDIT_CARD]: z.enum(MerchantPaymentMethodStatus),
});

export const CreateMerchantSettingsBodySchema = z.object({
  autoTransferSettings: CreateMerchantAutoTransferSettingsBodySchema.optional(),
  emailSettings: CreateMerchantEmailSettingsBodySchema.optional(),
  paymentMethods: CreateMerchantPaymentMethodsSettingsSchema.optional(),
  softDescriptor: z.string().regex(/^[A-Z0-9]*$/).max(18).optional(),
});

export const CreateMerchantBillingBodySchema = z.object({
  email: z.email().max(128),
  address: z.object({
    line1: z.string().max(200),
    line2: z.string().max(100).optional(),
    number: z.string().max(10),
    neighborhood: z.string().max(100),
    zipCode: ZodSchemas.numeric().max(15),
  }),
});

export const CreateMerchantBodySchema = z.object({
  tierId: ZodSchemas.nanoid().optional(),
  tenantId: ZodSchemas.nanoid(),
  documentNumber: ZodSchemas.document(),
  externalUserId: z.string().optional(),
  documentType: z.enum(DocumentType),
  externalId: z.string().max(128).optional(),
  segmentId: ZodSchemas.nanoid(),
  companyName: z.string().max(320).optional(),
  personName: z.string().min(1).max(50),
  personEmail: z.email().max(128),
  tradingName: z.string().max(120),
  billing: CreateMerchantBillingBodySchema,
  url: z.string(),
  settings: CreateMerchantSettingsBodySchema.optional().default(() => ({})),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export type CreateMerchantBillingBodyDto = z.infer<typeof CreateMerchantBillingBodySchema>;
export type CreateMerchantSettingsBodyDto = z.infer<typeof CreateMerchantSettingsBodySchema>;
export type CreateMerchantBodyDto = z.infer<typeof CreateMerchantBodySchema>;
