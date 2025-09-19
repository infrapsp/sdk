import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { CreateAddressBodySchema } from '../../../modules/types/address/create_address_request.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const CreateTransactionPixMethodSettingsBodySchema = z.object({
  expiresIn: z.number().positive().int(),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })),
  payerRequest: z.string().max(140).nullable().optional(),
});

export const CreateTransactionCreditCardMethodSettingsBodySchema = z.object({
  installments: z.number().positive().int().min(1).max(12),
  cardToken: z.string().max(128),
  cvvToken: z.string().max(128),
});

export const CreateTransactionMethodSettingsBodySchema = CreateTransactionPixMethodSettingsBodySchema.or(
  CreateTransactionCreditCardMethodSettingsBodySchema,
);

export const CreateTransactionItemBodySchema = z.object({
  description: z.string(),
  amount: z.number().positive().int(),
  quantity: z.number().positive().int(),
  category: z.string(),
  code: z.string(),
});

export const CreateTransactionShippingBodySchema = z.object({
  amount: z.number().nonnegative().int(),
  address: CreateAddressBodySchema,
  description: z.string(),
  maxDeliveryDate: ZodSchemas.datetime().optional(),
  estimatedDeliveryDate: ZodSchemas.datetime().optional(),
  recipientName: z.string().min(1).max(50),
  recipientPhones: z.array(ZodSchemas.phone()),
});

export const CreateTransactionSplitBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  amount: z.number().positive().int(),
  isFeePayer: z.boolean(),
});

export const CreateTransactionCustomerBodySchema = z.object({
  companyName: z.string().max(320).optional(),
  personName: z.string().min(1).max(50),
  documentType: z.enum(DocumentType),
  documentNumber: ZodSchemas.document(),
  birthdate: ZodSchemas.datetime().optional(),
  gender: z.enum(Gender),
  phones: z.array(ZodSchemas.phone()),
  address: CreateAddressBodySchema,
  email: z.email().max(128),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export const BaseCreateTransactionBodySchema = z.object({
  method: z.enum(PaymentMethod),
  methodSettings: CreateTransactionMethodSettingsBodySchema,
  items: z.array(CreateTransactionItemBodySchema),
  shipping: CreateTransactionShippingBodySchema.optional().nullable(),
  notifyUrl: z.url().optional(),
  externalId: z.string().max(128).optional(),
  externalSaleChannel: z.string().regex(/^[^\s]+$/).max(128).optional().nullable(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const CreateTransactionCheckoutBodySchema = BaseCreateTransactionBodySchema.and(z.object({
  customer: CreateTransactionCustomerBodySchema.optional().nullable(),
}));

export const CreateTransactionBodySchema = BaseCreateTransactionBodySchema.and(z.object({
  amount: z.number().positive().int(),
  customer: CreateTransactionCustomerBodySchema,
  splits: z.array(CreateTransactionSplitBodySchema).optional().default(() => []),
}));

export const CreateTransactionCheckoutParamsSchema = BaseParamsSchema;

export type CreateTransactionBodyDto = z.infer<typeof CreateTransactionBodySchema>;
export type CreateTransactionShippingBodyDto = z.infer<typeof CreateTransactionShippingBodySchema>;
export type CreateTransactionItemBodyDto = z.infer<typeof CreateTransactionItemBodySchema>;
export type CreateTransactionPixMethodSettingsBodyDto = z.infer<typeof CreateTransactionPixMethodSettingsBodySchema>;
export type CreateTransactionSplitBodyDto = z.infer<typeof CreateTransactionSplitBodySchema>;
export type CreateTransactionCustomerBodyDto = z.infer<typeof CreateTransactionCustomerBodySchema>;
export type CreateTransactionCheckoutBodyDto = z.infer<typeof CreateTransactionCheckoutBodySchema>;
export type CreateTransactionMethodSettingsBodyDto = z.infer<typeof CreateTransactionMethodSettingsBodySchema>;
export type CreateTransactionCreditCardMethodSettingsBodyDto = z.infer<typeof CreateTransactionCreditCardMethodSettingsBodySchema>;
