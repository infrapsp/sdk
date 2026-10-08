import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const PayableResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'alW3joXi40mN1N6astSdY' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: '6oR5LdZf7qJjMmxQ2yJyf' }),
  transactionId: ZodSchemas.nanoid().optional().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  transferId: ZodSchemas.nanoid().optional().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  transactionSplitId: ZodSchemas.nanoid().optional().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  transactionRefundId: ZodSchemas.nanoid().optional().nullable().openapi({ example: 'lgUbH5A1vpg85zikTViBl' }),
  isTransactionOwner: z.boolean().optional().nullable().openapi({
    example: true,
    description: 'Indicates if the merchant is the owner of the transaction related to this payable (Only for transactions).',
  }),
  status: z.enum(PayableStatus).openapi({ example: PayableStatus.PAID }),
  amount: z.number().int().openapi({ example: 1000 }),
  fee: z.number().int().openapi({ example: 100 }),
  anticipationFee: z.number().int(),
  paymentDate: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  account: z.enum(BalanceAccountType),
  method: z.enum(PayableMethod).openapi({ example: PayableMethod.PIX }),
  type: z.enum(PayableType).openapi({ example: PayableType.CREDIT }),
  installment: z.number().int().openapi({ example: 1 }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
});

export type PayableResponseDto = z.infer<typeof PayableResponseSchema>;
