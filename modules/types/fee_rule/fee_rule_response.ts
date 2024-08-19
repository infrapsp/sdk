import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';

export const FeeRuleResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid().nullable().optional(),
  name: z.string(),
  fundSchedule: z.number().nonnegative(),
  method: z.nativeEnum(FeeRuleMethod),
  triggerEntity: z.nativeEnum(FeeRuleEntity),
  amountValue: z.number().int(),
  percentValue: z.number().int(),
  minAmount: z.number().int(),
  maxAmount: z.number().int(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
});

export type FeeRuleResponseDto = z.infer<typeof FeeRuleResponseSchema>;
