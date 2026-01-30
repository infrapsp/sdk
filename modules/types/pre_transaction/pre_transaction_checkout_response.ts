import { z } from 'npm:@hono/zod-openapi@1.1.0';
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
}).partial();

export const PreTransactionCheckoutResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  merchant: z.object({
    tradingName: z.string(),
    url: z.string(),
    settings: z.object({
      primaryColor: z.string(),
      secondaryColor: z.string(),
      logoUrl: z.string().nullable().optional(),
    }),
  }),
  description: z.string(),
  status: z.enum(PreTransactionStatus),
  items: z.array(TransactionItemResponseSchema),
  availableMethods: z.array(z.enum(PaymentMethod)),
  creditCardSettings: PreTransactionCheckoutCreditCardSettingsResponseSchema,
  shipping: TransactionCheckoutShippingResponseSchema.optional().nullable(),
  amount: z.number().positive().int(),
  customer: TransactionCheckoutCustomerResponseSchema.optional().nullable(),
  transactions: z.array(TransactionCheckoutResponseSchema),
  expirationDate: z.date(),
  maxAttempts: z.number().int().positive(),
  externalId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PreTransactionCheckoutResponseDto = z.infer<typeof PreTransactionCheckoutResponseSchema>;
