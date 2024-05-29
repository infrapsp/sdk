import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AddressResponseSchema } from '../../../modules/types/address/address_response.ts';
import { TransactionRefundResponseSchema } from '../../../modules/types/transaction_refund/transaction_refund_response.ts';

export const TransactionPixMethodSettingsResponseSchema = z.object({
  expiresIn: z.number().positive().int(),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })),
  payerRequest: z.string().max(140).nullable().optional(),
});

export const TransactionBoletoMethodSettingsResponseSchema = z.object({
  dueAt: z.date(),
});

export const TransactionMethodSettingsResponseSchema = TransactionPixMethodSettingsResponseSchema.or(TransactionBoletoMethodSettingsResponseSchema)
  .or(z.object({}));

export const TransactionPaymentLinkSettingsResponseSchema = z.object({ isEnabled: z.literal(false) }).or(
  z.object({
    isEnabled: z.literal(true),
    isRetryUsed: z.boolean(),
    maxAttempts: z.number().positive(),
    expirationDate: z.date(),
    availablePaymentMethods: z.array(z.nativeEnum(PaymentMethod)),
  }),
);

export const TransactionPixMethodDataResponseSchema = z.object({
  qrCode: z.string(),
  expirationDate: z.date(),
  url: z.string(),
});

export const TransactionBoletoMethodDataResponseSchema = z.object({
  barcode: z.string(),
});

export const TransactionMethodDataResponseSchema = TransactionPixMethodDataResponseSchema.or(TransactionBoletoMethodDataResponseSchema).or(
  z.object({}),
);

export const TransactionPixPaidDataResponseSchema = z.object({
  payer: z.string(),
  endToEndId: z.string(),
});

export const TransactionBoletoPaidDataResponseSchema = z.object({
  payer: z.string(),
});

export const TransactionPaidDataResponseSchema = TransactionPixPaidDataResponseSchema.or(TransactionBoletoPaidDataResponseSchema).or(
  z.object({}),
);
export const TransactionItemResponseSchema = z.object({
  description: z.string(),
  amount: z.number().positive().int(),
  quantity: z.number().positive().int(),
  category: z.string(),
  code: z.string(),
});

export const TransactionShippingResponseSchema = z.object({
  amount: z.number().positive().int(),
  address: AddressResponseSchema,
  description: z.string(),
  maxDeliveryDate: z.date().optional().nullable(),
  estimatedDeliveryDate: z.date().optional().nullable(),
  recipientName: z.string(),
  recipientPhones: z.array(ZodSchemas.phone()),
});

export const TransactionSplitResponseSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  amount: z.number().positive().int(),
  isFeePayer: z.boolean(),
});

export const TransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  providerId: z.string().nullable().optional(),
  provider: z.string(),
  status: z.nativeEnum(TransactionStatus),
  statusMessage: z.string(),
  method: z.nativeEnum(PaymentMethod),
  methodSettings: TransactionMethodSettingsResponseSchema,
  items: z.array(TransactionItemResponseSchema),
  refunds: z.array(TransactionRefundResponseSchema),
  shipping: TransactionShippingResponseSchema.optional().nullable(),
  methodData: TransactionMethodDataResponseSchema,
  paidData: TransactionPaidDataResponseSchema,
  paymentLinkSettings: TransactionPaymentLinkSettingsResponseSchema,
  amount: z.number().positive().int(),
  amountRefunded: z.number().nonnegative().int(),
  customerPersonName: z.string().min(5),
  customerDocumentType: z.nativeEnum(DocumentType),
  customerDocumentNumber: ZodSchemas.document(),
  customerBirthdate: z.date().nullable(),
  customerGender: z.nativeEnum(Gender),
  customerPhones: z.array(ZodSchemas.phone()),
  customerAddress: AddressResponseSchema,
  billingPersonName: z.string().min(5),
  billingDocumentType: z.nativeEnum(DocumentType),
  billingDocumentNumber: ZodSchemas.document(),
  billingAddress: AddressResponseSchema,
  notifyUrl: z.string().url().nullable(),
  splits: z.array(TransactionSplitResponseSchema),
  externalId: z.string().nullable(),
  metadata: z.record(z.string()),
  paidAt: z.date().nullable(),
  refundedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionResponseDto = z.infer<typeof TransactionResponseSchema>;
export type TransactionItemResponseDto = z.infer<typeof TransactionItemResponseSchema>;
export type TransactionShippingResponseDto = z.infer<typeof TransactionShippingResponseSchema>;
export type TransactionPaymentLinkSettingsResponseDto = z.infer<typeof TransactionPaymentLinkSettingsResponseSchema>;
export type TransactionPixMethodSettingsResponseDto = z.infer<typeof TransactionPixMethodSettingsResponseSchema>;
export type TransactionBoletoMethodSettingsResponseDto = z.infer<typeof TransactionBoletoMethodSettingsResponseSchema>;
export type TransactionPixMethodDataResponseDto = z.infer<typeof TransactionPixMethodDataResponseSchema>;
export type TransactionBoletoMethodDataResponseDto = z.infer<typeof TransactionBoletoMethodDataResponseSchema>;
export type TransactionPixPaidDataResponseDto = z.infer<typeof TransactionPixPaidDataResponseSchema>;
export type TransactionBoletoPaidDataResponseDto = z.infer<typeof TransactionBoletoPaidDataResponseSchema>;
export type TransactionSplitResponseDto = z.infer<typeof TransactionSplitResponseSchema>;
