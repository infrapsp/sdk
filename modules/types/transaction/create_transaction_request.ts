import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PaymentMethod } from '../../../modules/types/transaction/types.ts';
import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { CreateAddressBodySchema } from '../../../modules/types/address/create_address_request.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const CreateTransactionBoletoMethodSettingsBodySchema = z.object({
  expirationDate: ZodSchemas.futureDateString().openapi({ description: 'boleto expiration date', example: '2025-12-31' }),
  documentKind: z.enum(['DM', 'FS']).openapi({
    description: 'boleto document kind (DM = Duplicata Mercantil, FS = Fatura de Serviços)',
    example: 'DM',
  }),
}).transform((dto) => ({ ...dto, ourNumber: '' }));

export const CreateTransactionPixMethodSettingsBodySchema = z.object({
  expiresIn: z.number().positive().int().openapi({ example: 3600 }),
  additionalInfo: z.array(z.object({ key: z.string(), value: z.string() })).openapi({
    description: 'list of additional info to include on pix body',
    example: [{ key: 'key', value: 'value' }],
  }),
  payerRequest: z.string().max(140).nullable().optional().openapi({
    description: 'free text field that will display on pix payment screen',
    example: 'payment for the best store',
  }),
});

export const CreateTransactionThreeDSDeviceBodySchema = z.object({
  colorDepth: z.number().int().openapi({ description: 'color depth of the customer screen in bits', example: 24 }),
  deviceType3ds: z.enum(['BROWSER', 'DEVICE']).openapi({ description: 'type of device used by the customer', example: 'BROWSER' }),
  javaEnabled: z.boolean().openapi({ description: 'whether java is enabled on the customer device', example: false }),
  language: z.string().regex(/^[a-z]{2}-[A-Z]{2}$/).openapi({ description: 'language of the customer device in the format xx-YY', example: 'pt-BR' }),
  screenHeight: z.number().int().positive().openapi({ description: 'height of the customer screen in pixels', example: 1080 }),
  screenWidth: z.number().int().positive().openapi({ description: 'width of the customer screen in pixels', example: 1920 }),
  timeZoneOffset: z.number().int().min(-12).max(12).transform((n) => String(n)).openapi({
    description: 'time zone offset of the customer device in hours (-12 to 12)',
    example: -3,
  }),
});

export const CreateTransactionThreeDSBodySchema = z.object({
  device: CreateTransactionThreeDSDeviceBodySchema.openapi({ description: 'information about the customer device used for 3DS authentication' }),
  redirectUrl: z.url().openapi({
    description:
      'URL the cardholder is redirected to after the 3DS authentication succeeds. Also used on failure when redirectUrlFailure is not provided.',
    example: 'https://shop.example.com/checkout/return',
  }),
  redirectUrlFailure: z.url().optional().openapi({
    description: 'URL the cardholder is redirected to when the 3DS authentication fails. Defaults to redirectUrl when not provided.',
    example: 'https://shop.example.com/checkout/error',
  }),
});

export const CreateTransactionCreditCardMethodSettingsBodySchema = z.object({
  installments: z.number().positive().int().min(1).max(12).openapi({
    description: 'number of installments for the transaction. minimum R$5.00 (500 cents) per installment is required',
    example: 3,
  }),
  cardToken: z.string().max(128).openapi({ description: 'token created on Proxy PCI', example: 'CLSWJs7C6xxnX6NwQ72sO' }),
  cvvToken: z.string().max(128).openapi({ description: 'token created on Proxy PCI', example: 'tCGbwK1GM87rrO13lqTkhEoon' }),
  threeDS: CreateTransactionThreeDSBodySchema.optional().openapi({
    description:
      '3D Secure authentication data. required when the merchant is configured with 3DS enabled; when provided the transaction goes through the 3DS flow',
  }),
});

export const CreateTransactionGooglePayBodySchema = z.object({
  signature: z.string().openapi({
    description: 'field $.signature of the Google Pay payment token, forwarded as received',
    example: 'MEYCIQDOBWY5FiizsvNRM55YExMc7bqH/ZBb3OXKtuhivnfIbwIhAMiBCwM0yS',
  }),
  data: z.string().openapi({
    description: 'field $.signedMessage of the Google Pay payment token. must be sent as an unmodified string, without escaping or decoding',
    example:
      '{"encryptedMessage":"WB8LjdsvcPw6upuTkqerWJjUTWclVZtNS","ephemeralPublicKey":"BAGXPgKKkX+kcKJhRZCAU6aM2KVbWQqdbIXxVJ7YOlCrSJHX","tag":"2IyuvaN+dF1lBYYKBwl//OqU1h5GPAL3AgFo+ioXKcM="}',
  }),
  intermediateSigningKey: z.object({
    signingKey: z.string().openapi({
      description: 'field $.intermediateSigningKey.signedKey of the Google Pay payment token, forwarded as an unmodified string',
      example:
        '{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEsJpB5MZVAvbZ4NdSFjUezaFouPb3PKuEGzLKQucMQtdZdN2BpI3vniWkcVJIWbJlUkxV95KN5Gf5N6sBTotkOw==","keyExpiration":"1741169653679"}',
    }),
    signature: z.array(z.string()).nonempty().openapi({
      description: 'field $.intermediateSigningKey.signatures of the Google Pay payment token, forwarded as received',
      example: ['MEUCIQD0N/1zA62ghlY1InQ3FVO2F6PmKm83z3GzL1DbUkBsUQIgVpkbJCDYbOYWXBWlMJBmbsO0PHMaVkBkeAVerpeC/4I='],
    }),
  }),
});

export const CreateTransactionApplePayBodySchema = z.object({
  merchantId: z.string().openapi({ description: 'merchant identifier (URI) registered with Apple', example: 'merchant.br.com.userede.wallet' }),
  clientTransactionCode: z.string().openapi({
    description: 'field $.transactionIdentifier of the Apple Pay payment token',
    example: '16987b83feb6d7e93a4b1002e194ae9b355',
  }),
  data: z.string().openapi({
    description: 'field $.paymentData.data of the Apple Pay payment token, forwarded as received',
    example: 'UmclN+N8bff0mBk9LZ5bD64o3ClAPEpTxgGunvjuTao5GdY1kUr+JQhKniXBTP8qw+OpuBw==',
  }),
  ephemeralPublicKey: z.string().openapi({
    description: 'field $.paymentData.header.ephemeralPublicKey of the Apple Pay payment token',
    example: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEl/XAbOgrSCupps/QbIxJ3u4QZ1PlbO5uGDD1zj/JGMoephYSEgw+63gHQHekx3T8duXN3CoYafUpuQlwOeK6/w==',
  }),
  publicKey: z.string().openapi({
    description: 'field $.paymentData.header.publicKeyHash of the Apple Pay payment token',
    example: 'Dmv3G2gd/xoKrhG8XxEo6waAvnKE0puMmw+1jnrEpj8=',
  }),
  signature: z.string().openapi({
    description: 'field $.paymentData.signature of the Apple Pay payment token',
    example: 'MIAGCSqGSIb3DQEHAqCAMIACAQExDTALBglghkga9oCB7szWw5nNgQ82QZfQOnxEhcyEoAAAAAAAA=',
  }),
});

export const CreateTransactionWalletMethodSettingsBodySchema = z.object({
  installments: z.number().positive().int().min(1).max(12).openapi({
    description: 'number of installments for the transaction. minimum R$5.00 (500 cents) per installment is required',
    example: 1,
  }),
  brand: z.string().transform((brand) => brand.toLowerCase()).openapi({
    description: 'card network reported by the wallet (cardNetwork on Google Pay). supported: visa, mastercard, elo',
    example: 'visa',
  }),
  googlePay: CreateTransactionGooglePayBodySchema.optional().openapi({
    description: 'encrypted payment token returned by Google Pay. exactly one of googlePay or applePay must be sent.',
  }),
  applePay: CreateTransactionApplePayBodySchema.optional().openapi({
    description: 'encrypted payment token returned by Apple Pay. exactly one of googlePay or applePay must be sent.',
  }),
});

export const CreateTransactionMethodSettingsBodySchema = CreateTransactionPixMethodSettingsBodySchema.openapi({ title: 'Pix' })
  .or(CreateTransactionCreditCardMethodSettingsBodySchema.openapi({ title: 'Credit card' }))
  .or(CreateTransactionBoletoMethodSettingsBodySchema.openapi({ title: 'Boleto' }))
  .or(CreateTransactionWalletMethodSettingsBodySchema.openapi({ title: 'Wallet (Google Pay / Apple Pay)' }));

export const CreateTransactionItemBodySchema = z.object({
  description: z.string().openapi({ example: 'product description' }),
  amount: z.number().positive().int().max(10000000).openapi({ example: 1000 }),
  quantity: z.number().positive().int().openapi({ example: 1 }),
  category: z.string().openapi({ example: 'product' }),
  code: z.string().openapi({ example: '123' }),
});

export const CreateTransactionShippingBodySchema = z.object({
  amount: z.number().nonnegative().int().max(10000000).openapi({ example: 1000 }),
  address: CreateAddressBodySchema.openapi({ description: 'shipping address' }),
  description: z.string().openapi({ example: 'Sedex 10' }),
  maxDeliveryDate: ZodSchemas.datetime().optional().openapi({ example: '2021-12-31T23:59:59.999Z' }),
  estimatedDeliveryDate: ZodSchemas.datetime().optional().openapi({ example: '2021-12-31T23:59:59.999Z' }),
  recipientName: z.string().min(1).max(50).openapi({ example: 'John Doe' }),
  recipientPhones: z.array(ZodSchemas.phone()).openapi({ example: ['+5511999999999'] }),
});

export const CreateTransactionSplitBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  amount: z.number().positive().int().max(10000000).openapi({ example: 1000 }),
  isFeePayer: z.boolean().openapi({
    example: true,
    description:
      'specify who is going to be responsible for the fees. at least one and only one merchant can be the fee payer, and his split value must cover the fee completely',
  }),
});

export const CreateTransactionCustomerBodySchema = z.object({
  companyName: z.string().max(320).optional().openapi({ example: 'Company Name' }),
  personName: z.string().min(1).max(50).openapi({ example: 'John Doe' }),
  documentType: z.enum(DocumentType).openapi({ example: DocumentType.CPF }),
  documentNumber: ZodSchemas.document().openapi({ example: '16142765010', type: 'string' }),
  birthdate: ZodSchemas.datetime().optional().openapi({ example: '1999-03-01T03:00:00.000Z' }),
  gender: z.enum(Gender).openapi({ example: Gender.MALE }),
  phones: z.array(ZodSchemas.phone()).openapi({ example: ['+5511999999999'] }),
  address: CreateAddressBodySchema.openapi({ description: 'customer address' }),
  email: z.email().max(128).openapi({ example: 'customer@email.com' }),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  ZodRefines.hasCompanyData(ctx, dto.companyName, dto.documentType, 'companyName');
  return dto;
});

export const CreateTransactionContextBodySchema = z.object({
  deviceFingerprint: z.string().max(256).optional().openapi({
    example: 'fingerprint_string',
    description:
      'device fingerprint collected from the customer device. See [Fingerprint Documentation](#description/fingerprint) for implementation details.',
  }),
  ip: z.string().optional().openapi({ example: '139.251.21.45', description: 'ip address of the customer device' }),
  userAgent: z.string().max(512).optional().openapi({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    description: 'user agent of the customer device',
  }),
});

export const BaseCreateTransactionBodySchema = z.object({
  method: z.enum(PaymentMethod).openapi({ example: PaymentMethod.PIX, description: 'use unknown if setting up a payment link' }),
  context: CreateTransactionContextBodySchema.optional().openapi({ description: 'information about the customer device and environment' }),
  methodSettings: CreateTransactionMethodSettingsBodySchema.openapi({ description: 'one of the schemas, depending on the payment method' }),
  items: z.array(CreateTransactionItemBodySchema).openapi({ description: 'describe the items that compose the transaction' }),
  shipping: CreateTransactionShippingBodySchema.optional().nullable().openapi({ description: 'shipping information' }),
  notifyUrl: z.url().optional().openapi({
    example: 'https://example.com',
    description: 'url that we will notify any transaction updates (via webhooks)',
  }),
  externalId: z.string().max(128).optional().openapi({ example: '123', description: 'external id for the transaction' }),
  externalSaleChannel: z.string().regex(/^[^\s]+$/).max(128).optional().nullable().openapi({
    example: 'ecommerce',
    description: 'channel where the transaction was made',
  }),
  metadata: z.record(z.string(), z.string()).optional().openapi({ example: { key: 'value' }, description: 'open field to store information' }),
}).transform((dto, ctx) => {
  const { method, methodSettings } = dto;
  const isWallet = 'brand' in methodSettings;

  if (method === PaymentMethod.CREDIT_CARD && !dto.context?.deviceFingerprint) {
    ZodHelpers.issue(ctx, 'context.deviceFingerprint', 'Required for method credit_card.');
  }

  const settingsMatchMethod: Record<PaymentMethod, boolean> = {
    [PaymentMethod.PIX]: 'expiresIn' in methodSettings,
    [PaymentMethod.BOLETO]: 'documentKind' in methodSettings,
    [PaymentMethod.CREDIT_CARD]: 'cardToken' in methodSettings || isWallet,
    [PaymentMethod.UNKNOWN]: true,
  };

  if (!settingsMatchMethod[method]) {
    ZodHelpers.issue(ctx, 'methodSettings', `Does not match method ${method}.`);
  }

  if (isWallet && ['googlePay', 'applePay'].filter((wallet) => wallet in methodSettings).length !== 1) {
    ZodHelpers.issue(ctx, 'methodSettings', 'Exactly one of googlePay or applePay is required.');
  }

  return dto;
});

export const CreateTransactionCheckoutBodySchema = BaseCreateTransactionBodySchema.and(z.object({
  customer: CreateTransactionCustomerBodySchema.optional().nullable().openapi({ description: 'customer information' }),
}));

export const CreateTransactionBodySchema = BaseCreateTransactionBodySchema.and(z.object({
  amount: z.number().positive().int().max(10000000).openapi({
    example: 1000,
    description: 'total amount for the transaction, including shipping and items',
  }),
  customer: CreateTransactionCustomerBodySchema.openapi({ description: 'customer information' }),
  splits: z.array(CreateTransactionSplitBodySchema).optional().default(() => []).openapi({
    description:
      'specify how the transaction will be splitted between one or more merchants. if null, current merchant will receive the total amount by default',
  }),
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
export type CreateTransactionWalletMethodSettingsBodyDto = z.infer<typeof CreateTransactionWalletMethodSettingsBodySchema>;
export type CreateTransactionThreeDSBodyDto = z.infer<typeof CreateTransactionThreeDSBodySchema>;
