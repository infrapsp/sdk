import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { OperationStatus, OriginEntity, OriginMethod } from '../../../modules/types/operation/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const OperationResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'zZebjp82qsenXXnu947f6' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'j9cQwAr3KXolCLSYWleOG' }),
  payableId: ZodSchemas.nanoid().openapi({ example: 'v1vvAMmAePFJdkAU073hc' }),
  status: z.enum(OperationStatus).openapi({ example: OperationStatus.AVAILABLE }),
  amount: z.number().int().openapi({ example: 1000 }),
  paymentDate: z.date().openapi({
    description: 'date when the operation was liquidated and its amount became available in balance',
    example: '2021-09-01T00:00:00.000Z',
  }),
  entity: z.enum(OriginEntity).openapi({ example: OriginEntity.TRANSACTION }),
  account: z.enum(BalanceAccountType),
  method: z.enum(OriginMethod).openapi({ example: OriginMethod.PIX }),
  description: z.string().openapi({ example: 'TRX 20231231' }),
  createdAt: z.date().openapi({ example: '2021-09-01T00:00:00.000Z' }),
});

export type OperationResponseDto = z.infer<typeof OperationResponseSchema>;
