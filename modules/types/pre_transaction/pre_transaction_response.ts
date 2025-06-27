import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionCustomerResponseSchema,
  TransactionItemResponseSchema,
  TransactionShippingResponseSchema,
} from '../../../modules/types/transaction/transaction_response.ts';
import { PreTransactionStatus } from '../../../modules/types/pre_transaction/types.ts';
import { TransactionStatus } from '../../../modules/types/transaction/types.ts';

export const PreTransactionTransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  status: z.nativeEnum(TransactionStatus),
  method: z.string(),
});

export const PreTransactionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.nativeEnum(PreTransactionStatus),
  description: z.string(),
  items: z.array(TransactionItemResponseSchema),
  shipping: TransactionShippingResponseSchema.optional().nullable(),
  amount: z.number().positive().int(),
  customer: TransactionCustomerResponseSchema.optional().nullable(),
  transactions: z.array(PreTransactionTransactionResponseSchema).default([]),
  expirationDate: z.date(),
  maxAttempts: z.number().int().positive(),
  notifyUrl: z.string().url().nullable(),
  externalId: z.string().nullable(),
  metadata: z.record(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PreTransactionResponseDto = z.infer<typeof PreTransactionResponseSchema>;
