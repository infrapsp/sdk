import { z } from 'npm:@hono/zod-openapi@0.18.3';
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

export const TransactionMethodSettingsResponseSchema = TransactionPixMethodSettingsResponseSchema.or(z.object({}));

export const TransactionPixMethodDataResponseSchema = z.object({
  qrCode: z.string(),
  expirationDate: z.date(),
  url: z.string(),
});

export const TransactionMethodDataResponseSchema = TransactionPixMethodDataResponseSchema.or(
  z.object({}),
);

export const TransactionPixPaidDataResponseSchema = z.object({
  endToEndId: z.string(),
});

export const TransactionPaidDataResponseSchema = TransactionPixPaidDataResponseSchema.or(
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
  amount: z.number().nonnegative().int(),
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

export const TransactionCustomerResponseSchema = z.object({
  companyName: z.string().nullable().optional(),
  personName: z.string().min(1).max(50),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  birthdate: ZodSchemas.datetime().optional().nullable(),
  gender: z.nativeEnum(Gender),
  phones: z.array(ZodSchemas.phone()),
  address: AddressResponseSchema,
  email: z.string().email(),
});

export const TransactionBillingResponseSchema = z.object({
  companyName: z.string().nullable().optional(),
  personName: z.string().min(1).max(50),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: ZodSchemas.document(),
  address: AddressResponseSchema,
});

export const TransactionStatusHistoryResponseSchema = z.object({
  status: z.nativeEnum(TransactionStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  preTransactionId: ZodSchemas.nanoid().nullable().optional(),
  providerId: z.string().nullable().optional(),
  status: z.nativeEnum(TransactionStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionStatusHistoryResponseSchema),
  method: z.nativeEnum(PaymentMethod),
  methodSettings: TransactionMethodSettingsResponseSchema,
  items: z.array(TransactionItemResponseSchema),
  refunds: z.array(TransactionRefundResponseSchema),
  shipping: TransactionShippingResponseSchema.optional().nullable(),
  methodData: TransactionMethodDataResponseSchema,
  paidData: TransactionPaidDataResponseSchema,
  amount: z.number().positive().int(),
  amountRefunded: z.number().nonnegative().int(),
  customer: TransactionCustomerResponseSchema.optional().nullable(),
  notifyUrl: z.string().url().nullable(),
  splits: z.array(TransactionSplitResponseSchema),
  externalId: z.string().nullable(),
  externalSaleChannel: z.string().nullable(),
  metadata: z.record(z.string()),
  paidAt: z.date().nullable(),
  refundedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionResponseDto = z.infer<typeof TransactionResponseSchema>;
export type TransactionItemResponseDto = z.infer<typeof TransactionItemResponseSchema>;
export type TransactionShippingResponseDto = z.infer<typeof TransactionShippingResponseSchema>;
export type TransactionPixMethodSettingsResponseDto = z.infer<typeof TransactionPixMethodSettingsResponseSchema>;
export type TransactionPixMethodDataResponseDto = z.infer<typeof TransactionPixMethodDataResponseSchema>;
export type TransactionPixPaidDataResponseDto = z.infer<typeof TransactionPixPaidDataResponseSchema>;
export type TransactionSplitResponseDto = z.infer<typeof TransactionSplitResponseSchema>;
export type TransactionCustomerResponseDto = z.infer<typeof TransactionCustomerResponseSchema>;
export type TransactionBillingResponseDto = z.infer<typeof TransactionBillingResponseSchema>;
