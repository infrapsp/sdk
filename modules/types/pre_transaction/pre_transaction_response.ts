import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionCustomerResponseSchema,
  TransactionItemResponseSchema,
  TransactionShippingResponseSchema,
} from '../../../modules/types/transaction/transaction_response.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const PreTransactionTransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: '713044c6706f4d28a90fd' }),
  status: z.enum(TransactionStatus).openapi({ example: TransactionStatus.CREATED }),
  method: z.string().openapi({ example: PaymentMethod.PIX }),
});

export const PreTransactionCreditCardSettingsResponseSchema = z.object({
  maxInstallments: z.number().int().max(12).positive().openapi({
    example: 3,
    description: 'Maximum number of installments allowed for credit card payments',
  }),
  threeDS: z.object({
    mode: z.enum(['off', 'optional', 'required']),
    optionalThreshold: z.object({
      minAmount: z.number().int(),
    }),
  }).openapi({
    description: '3DS configuration that will be used. Taken from the merchant configuration',
    example: { mode: 'optional', optionalThreshold: { minAmount: 5000 } },
  }),
  wallets: z.object({
    googlePay: z.object({ isEnabled: z.boolean() }),
    applePay: z.object({ isEnabled: z.boolean() }),
  }).openapi({
    description: 'wallets that can be used on the checkout. Taken from the merchant configuration',
    example: { googlePay: { isEnabled: true }, applePay: { isEnabled: true } },
  }),
}).partial();

export const PreTransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  status: z.enum(PreTransactionStatus).openapi({ example: PreTransactionStatus.ACTIVE }),
  description: z.string().openapi({ description: 'A description of the pre transaction', example: 'payment for a service' }),
  items: z.array(TransactionItemResponseSchema).openapi({ description: 'The items of the pre transaction' }),
  shipping: TransactionShippingResponseSchema.optional().nullable().openapi({ description: 'shipping information' }),
  amount: z.number().positive().int().openapi({ example: 5000 }),
  availableMethods: z.array(z.enum(PaymentMethod)).openapi({
    description: 'The available payment methods for the pre transaction',
    example: [PaymentMethod.PIX, PaymentMethod.CREDIT_CARD],
  }),
  customer: TransactionCustomerResponseSchema.optional().nullable().openapi({ description: 'customer information' }),
  transactions: z.array(PreTransactionTransactionResponseSchema).default(() => []).openapi({
    description: 'The transactions created from the pre transaction',
  }),
  expirationDate: z.date().openapi({ description: 'The expiration date of the pre transaction', example: '2022-01-01T00:00:00Z' }),
  maxAttempts: z.number().int().positive().openapi({ description: 'The maximum number of attempts allowed for the pre transaction', example: 3 }),
  creditCardSettings: PreTransactionCreditCardSettingsResponseSchema,
  notifyUrl: z.url().nullable().openapi({
    example: 'https://example.com',
    description: 'url that we will notify any transaction updates (via webhooks)',
  }),
  externalId: z.string().nullable().openapi({ example: '123', description: 'external id for the transaction' }),
  metadata: z.record(z.string(), z.string()).openapi({ example: { key: 'value' }, description: 'open field to store information' }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
});

export type PreTransactionResponseDto = z.infer<typeof PreTransactionResponseSchema>;
