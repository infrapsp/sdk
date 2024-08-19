import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';

export const CreateFeeRuleBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
  amountValue: z.number().int(),
  percentValue: z.number().int(),
  name: z.string(),
  minAmount: z.number().int().min(0),
  maxAmount: z.number().int().max(999999999),
  method: z.nativeEnum(FeeRuleMethod),
  triggerEntity: z.nativeEnum(FeeRuleEntity),
  fundSchedule: z.number(),
  startDate: ZodSchemas.datetime(),
  endDate: ZodSchemas.datetime(),
});

export type CreateFeeRuleBodyDto = z.infer<typeof CreateFeeRuleBodySchema>;
