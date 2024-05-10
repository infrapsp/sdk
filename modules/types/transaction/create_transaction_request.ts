import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PaymentMethod } from './types.ts';
import { DocumentType, Gender } from '../merchant/types.ts';
import { ZodRefines, ZodSchemas } from '../zod.ts';
import { CreateAddressBodySchema } from '../address/create_address_request.ts';
import { EmptySchema } from '../base/requests.ts';

export const CreateTransactionPixMethodSettingsBodySchema = z.object({
  expiresIn: z.number().positive().int(),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })),
  payerRequest: z.string().max(140).nullable().optional(),
});

export const CreateTransactionBoletoMethodSettingsBodySchema = z.object({
  dueAt: ZodSchemas.datetime(),
});

export const CreateTransactionMethodSettingsBodySchema = CreateTransactionPixMethodSettingsBodySchema.or(
  CreateTransactionBoletoMethodSettingsBodySchema,
).or(EmptySchema);

export const CreateTransactionPaymentLinkSettingsBodySchema = z.object({ isEnabled: z.literal(false) }).or(
  z.object({
    isEnabled: z.literal(true),
    maxAttempts: z.number().positive(),
    expirationDate: ZodSchemas.datetime(),
    availablePaymentMethods: z.array(z.nativeEnum(PaymentMethod)),
  }),
);

export const CreateTransactionItemBodySchema = z.object({
  description: z.string(),
  amount: z.number().positive().int(),
  quantity: z.number().positive().int(),
  category: z.string(),
  code: z.string(),
});

export const CreateTransactionShippingBodySchema = z.object({
  amount: z.number().positive().int(),
  address: CreateAddressBodySchema,
  description: z.string(),
  maxDeliveryDate: ZodSchemas.datetime().optional(),
  estimatedDeliveryDate: ZodSchemas.datetime().optional(),
  recipientName: z.string(),
  recipientPhones: z.array(ZodSchemas.phone()),
});

export const CreateTransactionSplitBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  amount: z.number().positive().int(),
  isFeePayer: z.boolean(),
});

export const CreateTransactionBodySchema = z.object({
  method: z.nativeEnum(PaymentMethod),
  methodSettings: CreateTransactionMethodSettingsBodySchema,
  paymentLinkSettings: CreateTransactionPaymentLinkSettingsBodySchema,
  items: z.array(CreateTransactionItemBodySchema),
  shipping: CreateTransactionShippingBodySchema.optional().nullable(),
  amount: z.number().positive().int(),
  customerPersonName: z.string().min(5),
  customerDocumentType: z.nativeEnum(DocumentType),
  customerDocumentNumber: ZodSchemas.document(),
  customerBirthdate: ZodSchemas.datetime().optional(),
  customerGender: z.nativeEnum(Gender),
  customerPhones: z.array(ZodSchemas.phone()),
  customerAddress: CreateAddressBodySchema,
  billingPersonName: z.string().min(5),
  billingDocumentType: z.nativeEnum(DocumentType),
  billingDocumentNumber: ZodSchemas.document(),
  billingAddress: CreateAddressBodySchema,
  notifyUrl: z.string().url().optional(),
  splits: z.array(CreateTransactionSplitBodySchema).optional().default([]),
  externalId: z.string().optional(),
  metadata: z.record(z.string()).optional(),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.customerDocumentNumber, dto.customerDocumentType);
  ZodRefines.matchDocument(ctx, dto.billingDocumentNumber, dto.billingDocumentType);
  return dto;
});

export type CreateTransactionBodyDto = z.infer<typeof CreateTransactionBodySchema>;
export type CreateTransactionShippingBodyDto = z.infer<typeof CreateTransactionShippingBodySchema>;
export type CreateTransactionItemBodyDto = z.infer<typeof CreateTransactionItemBodySchema>;
export type CreateTransactionPixMethodSettingsBodyDto = z.infer<typeof CreateTransactionPixMethodSettingsBodySchema>;
export type CreateTransactionBoletoMethodSettingsBodyDto = z.infer<typeof CreateTransactionBoletoMethodSettingsBodySchema>;
export type CreateTransactionPaymentLinkSettingsBodyDto = z.infer<typeof CreateTransactionPaymentLinkSettingsBodySchema>;
export type CreateTransactionSplitBodyDto = z.infer<typeof CreateTransactionSplitBodySchema>;
