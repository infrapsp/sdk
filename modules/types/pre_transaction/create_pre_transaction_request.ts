import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import {
  CreateTransactionBillingBodySchema,
  CreateTransactionCustomerBodySchema,
  CreateTransactionItemBodySchema,
  CreateTransactionShippingBodySchema,
} from '../../../modules/types/transaction/create_transaction_request.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreatePreTransactionBodySchema = z.object({
  amount: z.number().positive().int(),
  items: z.array(CreateTransactionItemBodySchema),
  shipping: CreateTransactionShippingBodySchema.optional().nullable(),
  customer: CreateTransactionCustomerBodySchema.optional(),
  billing: CreateTransactionBillingBodySchema.optional(),
  expirationDate: ZodSchemas.datetime().default(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days from now
  maxAttempts: z.number().int().positive().max(3).default(3),
  notifyUrl: z.string().url().optional(),
  externalId: z.string().max(128).optional(),
  metadata: z.record(z.string()).optional(),
}).transform((dto, ctx) => {
  if (dto.expirationDate.getTime() > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime()) {
    ZodHelpers.issue(ctx, 'expirationDate', 'Expiration date is more than 30 days from now');
  }
  return dto;
});

export type CreatePreTransactionBodyDto = z.infer<typeof CreatePreTransactionBodySchema>;