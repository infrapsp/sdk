import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
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
  companyName: ZodSchemas.companyName().optional(),
  personName: ZodSchemas.name(),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  birthdate: ZodSchemas.datetime().optional(),
  gender: z.nativeEnum(Gender),
  phones: z.array(ZodSchemas.phone()),
  address: CreateAddressBodySchema,
  email: z.string().email().max(128),
});

export const CreateTransactionBillingBodySchema = z.object({
  companyName: ZodSchemas.companyName().optional(),
  personName: ZodSchemas.name(),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  address: CreateAddressBodySchema,
});

export const CreateTransactionBodySchema = z.object({
  method: z.nativeEnum(PaymentMethod),
  methodSettings: CreateTransactionMethodSettingsBodySchema,
  items: z.array(CreateTransactionItemBodySchema),
  shipping: CreateTransactionShippingBodySchema.optional().nullable(),
  amount: z.number().positive().int(),
  customer: CreateTransactionCustomerBodySchema.optional(),
  billing: CreateTransactionBillingBodySchema.optional(),
  notifyUrl: z.string().url().optional(),
  splits: z.array(CreateTransactionSplitBodySchema).optional().default([]),
  externalId: z.string().max(128).optional(),
  metadata: z.record(z.string()).optional(),
}).transform((dto, ctx) => {
  if (dto.customer) {
    ZodRefines.matchDocument(ctx, dto.customer.documentNumber, dto.customer.documentType);
    ZodRefines.hasCompanyData(ctx, dto.customer.companyName, dto.customer.documentType, 'customer.companyName');
  }

  if (dto.billing) {
    ZodRefines.matchDocument(ctx, dto.billing.documentNumber, dto.billing.documentType);
    ZodRefines.hasCompanyData(ctx, dto.billing.companyName, dto.billing.documentType, 'billing.companyName');
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
