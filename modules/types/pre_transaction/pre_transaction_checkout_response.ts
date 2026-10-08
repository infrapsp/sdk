import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionItemResponseSchema } from '../../../modules/types/transaction/transaction_response.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';
import {
  TransactionCheckoutCustomerResponseSchema,
  TransactionCheckoutResponseSchema,
  TransactionCheckoutShippingResponseSchema,
} from '../../../modules/types/transaction/transaction_checkout_response.ts';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';

export const PreTransactionCheckoutCreditCardSettingsResponseSchema = z.object({
  maxInstallments: z.number().int().max(12).positive(),
  threeDS: z.object({
    mode: z.enum(['off', 'optional', 'required']),
    optionalThreshold: z.object({
      minAmount: z.number().int(),
    }),
  }),
  wallets: z.object({
    googlePay: z.object({ isEnabled: z.boolean() }),
    applePay: z.object({ isEnabled: z.boolean() }),
  }),
}).partial();

export const PreTransactionCheckoutResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  merchant: z.object({
    tradingName: z.string().openapi({ example: 'My Store' }),
    url: z.string().openapi({ example: 'https://mystore.com' }),
    settings: z.object({
      primaryColor: z.string().openapi({ description: 'hexadecimal primary color used for customizations', example: '#000000' }),
      secondaryColor: z.string().openapi({ description: 'hexadecimal secondary color used for customizations', example: '#FFFFFF' }),
      logoUrl: z.string().nullable().optional().openapi({ example: 'https://mystore.com/logo.png' }),
    }),
  }),
  description: z.string().openapi({ description: 'A description of the pre transaction', example: 'payment for a service' }),
  status: z.enum(PreTransactionStatus).openapi({ example: PreTransactionStatus.ACTIVE }),
  items: z.array(TransactionItemResponseSchema).openapi({ description: 'The items of the pre transaction' }),
  availableMethods: z.array(z.enum(PaymentMethod)),
  creditCardSettings: PreTransactionCheckoutCreditCardSettingsResponseSchema,
  shipping: TransactionCheckoutShippingResponseSchema.optional().nullable().openapi({ description: 'shipping information' }),
  amount: z.number().positive().int().openapi({ example: 5000 }),
  customer: TransactionCheckoutCustomerResponseSchema.optional().nullable().openapi({ description: 'customer information' }),
  transactions: z.array(TransactionCheckoutResponseSchema).openapi({ description: 'The transactions of the pre transaction' }),
  expirationDate: z.date().openapi({ description: 'The expiration date of the pre transaction', example: '2022-01-01T00:00:00Z' }),
  maxAttempts: z.number().int().positive().openapi({ description: 'The maximum number of attempts allowed for the pre transaction', example: 3 }),
  externalId: z.string().nullable().openapi({ example: '123', description: 'external id for the transaction' }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
});

export type PreTransactionCheckoutResponseDto = z.infer<typeof PreTransactionCheckoutResponseSchema>;
