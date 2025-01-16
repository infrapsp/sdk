import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { TransactionItemResponseSchema } from '../../../modules/types/transaction/transaction_response.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';
import {
  TransactionCheckoutBillingResponseSchema,
  TransactionCheckoutCustomerResponseSchema,
  TransactionCheckoutResponseSchema,
  TransactionCheckoutShippingResponseSchema,
} from '../../../modules/types/transaction/transaction_checkout_response.ts';

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
  status: z.nativeEnum(PreTransactionStatus),
  items: z.array(TransactionItemResponseSchema),
  shipping: TransactionCheckoutShippingResponseSchema.optional().nullable(),
  amount: z.number().positive().int(),
  customer: TransactionCheckoutCustomerResponseSchema.optional().nullable(),
  billing: TransactionCheckoutBillingResponseSchema.optional().nullable(),
  transactions: z.array(TransactionCheckoutResponseSchema),
  expirationDate: z.date(),
  maxAttempts: z.number().int().positive(),
  externalId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PreTransactionCheckoutResponseDto = z.infer<typeof PreTransactionCheckoutResponseSchema>;
