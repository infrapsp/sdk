import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

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
}).transform((dto, ctx) => {
  if (dto.maxAmount < dto.minAmount) {
    ZodHelpers.issue(ctx, 'maxAmount', 'Must be greater than minAmount.');
  }
  return dto;
});

export type CreateFeeRuleBodyDto = z.infer<typeof CreateFeeRuleBodySchema>;
