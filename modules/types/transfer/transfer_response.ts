import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { TransferMethod, TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const TransferPixMethodDestinationResponseSchema = z.object({
  pixKey: z.string().optional().nullable().openapi({ example: '12345678901' }),
  name: z.string().optional().nullable().openapi({ example: 'John Doe' }),
  bank: z.string().optional().nullable().openapi({ example: 'ITAU UNIBANCO' }),
  ispb: z.string().optional().nullable().openapi({ example: '60701190' }),
  bankBranch: z.string().optional().nullable().openapi({ example: '3741' }),
  accountNumber: z.string().optional().nullable().openapi({ example: '66736' }),
  accountDigit: z.string().optional().nullable().openapi({ example: '9' }),
  documentNumber: z.string().optional().nullable().openapi({ example: '40980860008' }),
  accountType: z.string().optional().nullable().openapi({ example: 'Conta Corrente' }),
  paymentArrangement: z.string().optional().nullable().openapi({
    description: 'If the account is equal to slc, contains the arrangement the transfer is associated with',
    example: 'MCC',
  }),
  documentType: z.enum(DocumentType).optional().nullable().openapi({ example: DocumentType.CPF }),
  urContractEffectId: z.string().optional().nullable(),
  urContractEffectProviderId: z.string().optional().nullable(),
});

export const TransferMethodDestinationResponseSchema = TransferPixMethodDestinationResponseSchema.openapi({ title: 'Pix' }).or(
  z.object({}).openapi({ title: 'Empty' }),
);

export const TransferStatusResponseSchema = z.object({
  status: z.enum(TransferStatus).openapi({ example: TransferStatus.PROCESSING }),
  message: z.string().openapi({ example: 'Processing transfer' }),
  createdAt: z.date().openapi({ example: '2021-07-29T14:00:00Z' }),
});

export const TransferResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'hhFHjpKeGTpTJnw2z2jmz' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'zpBxynBgNCzbdOKmpKG1k' }),
  provider: z.string().nullable().optional(),
  account: z.enum(BalanceAccountType).openapi({ example: BalanceAccountType.SLC }),
  method: z.enum(TransferMethod).openapi({ example: TransferMethod.PIX }),
  methodDestination: TransferMethodDestinationResponseSchema.openapi({ description: 'one of the schemas, depending on the method' }),
  isAutoTransfer: z.boolean().openapi({ example: true }),
  amount: z.number().positive().int().openapi({ example: 1000 }),
  status: z.enum(TransferStatus).openapi({ example: TransferStatus.PROCESSING }),
  statusMessage: z.string().openapi({ example: 'Processing transfer' }),
  statusHistory: z.array(TransferStatusResponseSchema).openapi({ description: 'history of status changes' }),
  metadata: z.record(z.string(), z.string().or(z.number())).openapi({ example: { key: 'value' }, description: 'open field to store information' }),
  createdAt: z.date().openapi({ example: '2021-07-29T14:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2021-07-29T14:00:00Z' }),
});

export type TransferResponseDto = z.infer<typeof TransferResponseSchema>;
