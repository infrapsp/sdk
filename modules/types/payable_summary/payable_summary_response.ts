import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const PayableSummaryResponseSchema = z.object({
  day: z.string().date(),
  type: z.enum(PayableType),
  method: z.enum(PayableMethod),
  status: z.enum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
});

export type PayableSummaryResponseDto = z.infer<typeof PayableSummaryResponseSchema>;
