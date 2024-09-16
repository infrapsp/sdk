import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionBillingResponseSchema,
  TransactionCustomerResponseSchema,
  TransactionItemResponseSchema,
  TransactionShippingResponseSchema,
} from '../../../modules/types/transaction/transaction_response.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';

export const PreTransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.nativeEnum(PreTransactionStatus),
  items: z.array(TransactionItemResponseSchema),
  shipping: TransactionShippingResponseSchema.optional().nullable(),
  amount: z.number().positive().int(),
  customer: TransactionCustomerResponseSchema.optional().nullable(),
  billing: TransactionBillingResponseSchema.optional().nullable(),
  expirationDate: z.date(),
  maxAttempts: z.number().int().positive(),
  notifyUrl: z.string().url().nullable(),
  externalId: z.string().nullable(),
  metadata: z.record(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PreTransactionResponseDto = z.infer<typeof PreTransactionResponseSchema>;
