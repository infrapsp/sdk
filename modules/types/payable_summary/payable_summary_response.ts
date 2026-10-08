import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const PayableSummaryResponseSchema = z.object({
  day: z.string().date().openapi({ example: '2021-09-01' }),
  type: z.enum(PayableType).openapi({ example: PayableType.CREDIT }),
  method: z.enum(PayableMethod).openapi({ example: PayableMethod.PIX }),
  status: z.enum(PayableStatus).openapi({ example: PayableStatus.WAITING_FUNDS }),
  amount: z.number().int().openapi({ example: 1000 }),
  fee: z.number().int().openapi({ example: 100 }),
  anticipationFee: z.number().int(),
});

export type PayableSummaryResponseDto = z.infer<typeof PayableSummaryResponseSchema>;
