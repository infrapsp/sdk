import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { PayableMethod, PayableStatus, PayableType } from '../../../modules/types/payable/types.ts';

export const PayableSummaryResponseSchema = z.object({
  day: z.string().date(),
  type: z.nativeEnum(PayableType),
  method: z.nativeEnum(PayableMethod),
  status: z.nativeEnum(PayableStatus),
  amount: z.number().int(),
  fee: z.number().int(),
});

export type PayableSummaryResponseDto = z.infer<typeof PayableSummaryResponseSchema>;
