import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const TransactionSplitDetailPayableResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'alW3joXi40mN1N6astSdY' }),
  status: z.enum(PayableStatus).openapi({ example: PayableStatus.PAID }),
  amount: z.number().int().openapi({ example: 1000 }),
  fee: z.number().int().openapi({ example: 100 }),
  anticipationFee: z.number().int(),
  paymentDate: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  method: z.enum(PayableMethod).openapi({ example: PayableMethod.PIX }),
  type: z.enum(PayableType).openapi({ example: PayableType.CREDIT }),
  installment: z.number().int().openapi({ example: 1 }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  transactionChargebackId: z.string().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  transactionRefundId: z.string().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
});

export const TransactionSplitDetailResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: '6oR5LdZf7qJjMmxQ2yJyf' }),
  isFeePayer: z.boolean().openapi({ example: true }),
  tradingName: z.string().openapi({ example: 'My Merchant' }),
  documentNumber: z.string().openapi({ description: 'masked value for cpf or plain value for cnpj', example: '***456789**' }),
  payables: z.array(TransactionSplitDetailPayableResponseSchema).openapi({ description: 'List of payables associated with the transaction split' }),
});

export type TransactionSplitDetailResponseDto = z.infer<typeof TransactionSplitDetailResponseSchema>;
