import { z } from 'npm:@hono/zod-openapi@0.18.3';
import {
  CreateTransactionBillingBodySchema,
  CreateTransactionCustomerBodySchema,
  CreateTransactionItemBodySchema,
  CreateTransactionShippingBodySchema,
} from '../../../modules/types/transaction/create_transaction_request.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreatePreTransactionBodySchema = z.object({
  amount: z.number().positive().int(),
  description: z.string().max(256),
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
