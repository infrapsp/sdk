import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';

export const CreateFeeRuleCreditCardBodySchema = z.object({
  anticipation: z.number().int().nonnegative(),
  chargebackGuarantee: z.number().int().nonnegative(),
  mdr: z.array(z.object({
    installment: z.number().int().min(1).max(12),
    percent: z.number().int().min(0).max(10000),
  })).length(12),
}).or(EmptySchema);

export const CreateFeeRuleBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
  amountValue: z.number().int(),
  percentValue: z.number().int(),
  name: z.string(),
  minAmount: z.number().int().min(0),
  maxAmount: z.number().int().max(999999999),
  method: z.enum(FeeRuleMethod),
  triggerEntity: z.enum(FeeRuleEntity),
  fundSchedule: z.number(),
  startDate: ZodSchemas.datetime(),
  endDate: ZodSchemas.datetime(),
  creditCard: CreateFeeRuleCreditCardBodySchema,
}).transform((dto, ctx) => {
  if (dto.maxAmount < dto.minAmount) {
    ZodHelpers.issue(ctx, 'maxAmount', 'Must be greater than minAmount.');
  }

  if (dto.method !== FeeRuleMethod.CREDIT_CARD && Object.keys(dto.creditCard).length > 0) {
    ZodHelpers.issue(ctx, 'creditCard', 'Credit card details can only be provided for credit card fee proposals.');
  }

  return dto;
});

export type CreateFeeRuleBodyDto = z.infer<typeof CreateFeeRuleBodySchema>;
