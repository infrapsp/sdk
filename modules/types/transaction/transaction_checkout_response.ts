import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { Gender } from '../../../modules/types/merchant/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionItemResponseSchema,
  TransactionMethodDataResponseSchema,
  TransactionMethodSettingsResponseSchema,
} from '../../../modules/types/transaction/transaction_response.ts';

export const TransactionCheckoutShippingResponseSchema = z.object({
  amount: z.number().nonnegative().int(),
  recipientName: z.string(),
});

export const TransactionCheckoutCustomerResponseSchema = z.object({
  companyName: z.string().nullable().optional(),
  personName: z.string().min(1).max(50),
  gender: z.nativeEnum(Gender),
});

export const TransactionCheckoutBillingResponseSchema = z.object({
  companyName: z.string().nullable().optional(),
  personName: z.string().min(1).max(50),
});

export const TransactionCheckoutResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  preTransactionId: ZodSchemas.nanoid().nullable().optional(),
  providerId: z.string().nullable().optional(),
  status: z.nativeEnum(TransactionStatus),
  method: z.nativeEnum(PaymentMethod),
  methodSettings: TransactionMethodSettingsResponseSchema,
  items: z.array(TransactionItemResponseSchema),
  shipping: TransactionCheckoutShippingResponseSchema.optional().nullable(),
  methodData: TransactionMethodDataResponseSchema,
  amount: z.number().positive().int(),
  customer: TransactionCheckoutCustomerResponseSchema.optional().nullable(),
  externalId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionCheckoutResponseDto = z.infer<typeof TransactionCheckoutResponseSchema>;
export type TransactionCheckoutShippingResponseDto = z.infer<typeof TransactionCheckoutShippingResponseSchema>;
export type TransactionCheckoutCustomerResponseDto = z.infer<typeof TransactionCheckoutCustomerResponseSchema>;
export type TransactionCheckoutBillingResponseDto = z.infer<typeof TransactionCheckoutBillingResponseSchema>;
