import { z } from 'npm:@hono/zod-openapi@1.4.0';
import {
  CreateTransactionCustomerBodySchema,
  CreateTransactionItemBodySchema,
  CreateTransactionShippingBodySchema,
} from '../../../modules/types/transaction/create_transaction_request.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';

export const CreatePreTransactionCreditCardSettingsBodySchema = z.object({
  maxInstallments: z.number().positive().int().min(1).max(12).default(1).openapi({
    example: 3,
    description: 'Maximum number of installments allowed for credit card payments',
  }),
}).partial();

export const CreatePreTransactionBodySchema = z.object({
  amount: z.number().positive().int().openapi({ description: 'The total amount of the transaction in cents', example: 5000 }),
  description: z.string().max(256).openapi({ description: 'A description of the pre transaction', example: 'payment for a service' }),
  items: z.array(CreateTransactionItemBodySchema).openapi({ description: 'The items of the pre transaction' }),
  shipping: CreateTransactionShippingBodySchema.optional().nullable().openapi({ description: 'shipping information' }),
  customer: CreateTransactionCustomerBodySchema.optional().openapi({ description: 'customer information' }),
  availableMethods: z.array(z.enum(PaymentMethod)).min(1).default([PaymentMethod.PIX]).openapi({
    description: 'The available payment methods for the pre transaction',
    example: [PaymentMethod.PIX, PaymentMethod.CREDIT_CARD],
  }),
  creditCardSettings: CreatePreTransactionCreditCardSettingsBodySchema.optional(),
  expirationDate: ZodSchemas.datetime().default(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).openapi({
    description: 'The expiration date of the pre transaction',
    example: '2022-01-01T00:00:00Z',
  }), // 30 days from now
  maxAttempts: z.number().int().positive().max(3).default(3).openapi({
    description: 'The maximum number of attempts allowed for the pre transaction',
    example: 3,
  }),
  notifyUrl: z.url().optional().openapi({
    example: 'https://example.com',
    description: 'url that we will notify any transaction updates (via webhooks)',
  }),
  externalId: z.string().max(128).optional().openapi({ example: '123', description: 'external id for the transaction' }),
  metadata: z.record(z.string(), z.string()).optional().openapi({ example: { key: 'value' }, description: 'open field to store information' }),
}).transform((dto, ctx) => {
  if (dto.expirationDate.getTime() > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime()) {
    ZodHelpers.issue(ctx, 'expirationDate', 'Expiration date is more than 30 days from now');
  }
  return dto;
});

export type CreatePreTransactionBodyDto = z.infer<typeof CreatePreTransactionBodySchema>;
