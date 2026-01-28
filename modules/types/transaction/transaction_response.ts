import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AddressResponseSchema } from '../../../modules/types/address/address_response.ts';
import { TransactionRefundResponseSchema } from '../../../modules/types/transaction_refund/transaction_refund_response.ts';
import { TransactionChargebackResponseSchema } from '../../../modules/types/transaction_chargeback/transaction_chargeback_response.ts';

export const TransactionPixMethodSettingsResponseSchema = z.object({
  expiresIn: z.number().positive().int(),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })),
  payerRequest: z.string().max(140).nullable().optional(),
});

export const TransactionCreditCardMethodSettingsResponseSchema = z.object({
  installments: z.number().positive().int(),
  expirationYear: ZodSchemas.numeric(),
  expirationMonth: ZodSchemas.numeric(),
  cardholderName: ZodSchemas.alphanumericWithSpace(),
  brand: z.string(),
  bin: z.string(),
  last4: z.string(),
  hasChargebackGuarantee: z.boolean(),
});

export const TransactionMethodSettingsResponseSchema = TransactionPixMethodSettingsResponseSchema.or(
  TransactionCreditCardMethodSettingsResponseSchema,
).or(z.object({}));

export const TransactionPixMethodDataResponseSchema = z.object({
  qrCode: z.string(),
  expirationDate: z.date(),
  url: z.string(),
});

export const TransactionCreditCardMethodDataResponseSchema = z.object({
  nsu: z.string(),
  authorizationCode: z.string(),
  brandId: z.string(),
});

export const TransactionMethodDataResponseSchema = TransactionPixMethodDataResponseSchema.or(TransactionCreditCardMethodDataResponseSchema).or(
  z.object({}),
);

export const TransactionPixPaidDataResponseSchema = z.object({
  endToEndId: z.string(),
  payer: z.object({
    name: z.string(),
    documentType: z.enum(DocumentType),
    documentNumber: z.string(),
    ispb: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    accountDigit: z.string(),
    bankBranch: z.string(),
  }).optional(),
});

export const TransactionCreditCardPaidDataResponseSchema = z.object({
  authorizationCode: z.string(),
  nsu: z.string(),
});

export const TransactionPaidDataResponseSchema = TransactionPixPaidDataResponseSchema.or(TransactionCreditCardPaidDataResponseSchema).or(
  z.object({}),
);

export const TransactionAntifraudDataResponseSchema = z.object({
  score: z.number().optional(),
  status: z.string().optional(),
});

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
  personName: z.string(),
  documentType: z.enum(DocumentType),
  documentNumber: ZodSchemas.document(),
  birthdate: ZodSchemas.datetime().optional().nullable(),
  gender: z.enum(Gender),
  phones: z.array(ZodSchemas.phone()),
  address: AddressResponseSchema,
  email: z.email(),
});

export const TransactionStatusHistoryResponseSchema = z.object({
  status: z.enum(TransactionStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  preTransactionId: ZodSchemas.nanoid().nullable().optional(),
  provider: z.string().nullable().optional(),
  providerId: z.string().nullable().optional(),
  status: z.enum(TransactionStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransactionStatusHistoryResponseSchema),
  method: z.enum(PaymentMethod),
  methodSettings: TransactionMethodSettingsResponseSchema,
  items: z.array(TransactionItemResponseSchema),
  refunds: z.array(TransactionRefundResponseSchema),
  chargebacks: z.array(TransactionChargebackResponseSchema),
  shipping: TransactionShippingResponseSchema.optional().nullable(),
  methodData: TransactionMethodDataResponseSchema,
  paidData: TransactionPaidDataResponseSchema,
  amount: z.number().positive().int(),
  amountRefunded: z.number().nonnegative().int(),
  amountChargedback: z.number().nonnegative().int(),
  customer: TransactionCustomerResponseSchema.optional().nullable(),
  notifyUrl: z.url().nullable(),
  splits: z.array(TransactionSplitResponseSchema),
  externalId: z.string().nullable(),
  externalSaleChannel: z.string().nullable(),
  antifraudData: TransactionAntifraudDataResponseSchema.optional().nullable(),
  metadata: z.record(z.string(), z.string()),
  paidAt: z.date().nullable(),
  refundedAt: z.date().nullable(),
  chargedbackAt: z.date().nullable(),
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
