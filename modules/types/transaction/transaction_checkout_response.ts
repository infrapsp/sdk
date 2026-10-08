import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PaymentMethod, TransactionStatus } from '../../../modules/types/transaction/types.ts';
import { Gender } from '../../../modules/types/merchant/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionItemResponseSchema,
  TransactionMethodDataResponseSchema,
  TransactionMethodSettingsResponseSchema,
} from '../../../modules/types/transaction/transaction_response.ts';

export const TransactionCheckoutShippingResponseSchema = z.object({
  amount: z.number().nonnegative().int().openapi({ example: 1000 }),
  recipientName: z.string().openapi({ example: 'John Doe' }),
});

export const TransactionCheckoutCustomerResponseSchema = z.object({
  companyName: z.string().nullable().optional().openapi({ example: 'Company John' }),
  personName: z.string().min(1).max(50).openapi({ example: 'John Doe' }),
  gender: z.enum(Gender).openapi({ example: Gender.MALE }),
});

export const TransactionCheckoutResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'gnQjJatJSrhxaGtXeTuDd' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'CRutyJmJHin46NXnRdCj' }),
  preTransactionId: ZodSchemas.nanoid().nullable().optional().openapi({ example: 'TN6wQQOoe3Au3CrspWS0r' }),
  providerId: z.string().nullable().optional().openapi({ example: 'b8d32335507746d381daf2d38db89111c496089b15' }),
  status: z.enum(TransactionStatus).openapi({ example: TransactionStatus.WAITING_PAYMENT }),
  method: z.enum(PaymentMethod).openapi({ example: PaymentMethod.PIX }),
  methodSettings: TransactionMethodSettingsResponseSchema.openapi({ description: 'one of the schemas depending on the payment method' }),
  items: z.array(TransactionItemResponseSchema).openapi({ description: 'describe the items that compose the transaction' }),
  shipping: TransactionCheckoutShippingResponseSchema.optional().nullable().openapi({ description: 'shipping information' }),
  methodData: TransactionMethodDataResponseSchema.openapi({ description: 'one of the schemas depending on the payment method' }),
  amount: z.number().positive().int().openapi({ example: 1000 }),
  customer: TransactionCheckoutCustomerResponseSchema.optional().nullable().openapi({ description: 'customer information' }),
  externalId: z.string().nullable().openapi({ description: 'external id for the transaction', example: 'my_ext_id' }),
  createdAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
});

export type TransactionCheckoutResponseDto = z.infer<typeof TransactionCheckoutResponseSchema>;
export type TransactionCheckoutShippingResponseDto = z.infer<typeof TransactionCheckoutShippingResponseSchema>;
export type TransactionCheckoutCustomerResponseDto = z.infer<typeof TransactionCheckoutCustomerResponseSchema>;
