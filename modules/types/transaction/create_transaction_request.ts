import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { CreateAddressBodySchema } from '../../../modules/types/address/create_address_request.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';

export const CreateTransactionPixMethodSettingsBodySchema = z.object({
  expiresIn: z.number().positive().int(),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })),
  payerRequest: z.string().max(140).nullable().optional(),
});

export const CreateTransactionMethodSettingsBodySchema = CreateTransactionPixMethodSettingsBodySchema.or(EmptySchema);

export const CreateTransactionItemBodySchema = z.object({
  description: z.string(),
  amount: z.number().positive().int(),
  quantity: z.number().positive().int(),
  category: z.string(),
  code: z.string(),
});

export const CreateTransactionShippingBodySchema = z.object({
  amount: z.number().nonnegative().int(),
  address: CreateAddressBodySchema,
  description: z.string(),
  maxDeliveryDate: ZodSchemas.datetime().optional(),
  estimatedDeliveryDate: ZodSchemas.datetime().optional(),
  recipientName: ZodSchemas.name(),
  recipientPhones: z.array(ZodSchemas.phone()),
});

export const CreateTransactionSplitBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  amount: z.number().positive().int(),
  isFeePayer: z.boolean(),
});

export const CreateTransactionCustomerBodySchema = z.object({
  companyName: z.string().max(320).optional(),
  personName: ZodSchemas.name(),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  birthdate: ZodSchemas.datetime().optional(),
  gender: z.nativeEnum(Gender),
  phones: z.array(ZodSchemas.phone()),
  address: CreateAddressBodySchema,
  email: z.string().email().max(128),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export const CreateTransactionBillingBodySchema = z.object({
  companyName: z.string().max(320).optional(),
  personName: ZodSchemas.name(),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  address: CreateAddressBodySchema,
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export const CreateTransactionBodySchema = z.object({
  preTransactionId: ZodSchemas.nanoid().optional(),
  amount: z.number().positive().int().optional(),
  method: z.nativeEnum(PaymentMethod),
  methodSettings: CreateTransactionMethodSettingsBodySchema,
  items: z.array(CreateTransactionItemBodySchema),
  shipping: CreateTransactionShippingBodySchema.optional().nullable(),
  customer: CreateTransactionCustomerBodySchema.optional().nullable(),
  billing: CreateTransactionBillingBodySchema.optional().nullable(),
  notifyUrl: z.string().url().optional(),
  splits: z.array(CreateTransactionSplitBodySchema).optional().default([]),
  externalId: z.string().max(128).optional(),
  metadata: z.record(z.string()).optional(),
}).transform((dto, ctx) => {
  if (!dto.preTransactionId) {
    if (!dto.amount) ZodHelpers.issue(ctx, 'amount', 'Amount is required when preTransactionId is not present');
  }
  return dto;
});

export type CreateTransactionBodyDto = z.infer<typeof CreateTransactionBodySchema>;
export type CreateTransactionShippingBodyDto = z.infer<typeof CreateTransactionShippingBodySchema>;
export type CreateTransactionItemBodyDto = z.infer<typeof CreateTransactionItemBodySchema>;
export type CreateTransactionPixMethodSettingsBodyDto = z.infer<typeof CreateTransactionPixMethodSettingsBodySchema>;
export type CreateTransactionSplitBodyDto = z.infer<typeof CreateTransactionSplitBodySchema>;
export type CreateTransactionCustomerBodyDto = z.infer<typeof CreateTransactionCustomerBodySchema>;
export type CreateTransactionBillingBodyDto = z.infer<typeof CreateTransactionBillingBodySchema>;
