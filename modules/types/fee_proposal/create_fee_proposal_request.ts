import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';

export const CreateFeeProposalCreditCardBodySchema = z.object({
  anticipation: z.number().int().nonnegative(),
  chargebackGuarantee: z.number().int().nonnegative(),
  mdr: z.array(z.object({
    installment: z.number().int().min(1).max(12),
    percent: z.number().int().min(0).max(10000),
  })).length(12),
}).or(EmptySchema);

export const RestrictCreateFeeProposalBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  author: z.string().min(1).max(128),
  expirationDate: ZodSchemas.datetime(),
  period: z.number().int().min(1),
  method: z.enum(FeeRuleMethod),
  triggerEntity: z.enum(FeeRuleEntity),
  fundSchedule: z.number().nonnegative(),
  amountValue: z.number().int(),
  percentValue: z.number().int(),
  minAmount: z.number().int().min(0),
  maxAmount: z.number().int().max(999999999),
  creditCard: CreateFeeProposalCreditCardBodySchema,
  name: z.string().max(255),
}).transform((dto, ctx) => {
  if (dto.maxAmount < dto.minAmount) {
    ZodHelpers.issue(ctx, 'maxAmount', 'Must be greater than minAmount.');
  }

  if (dto.method !== FeeRuleMethod.CREDIT_CARD && Object.keys(dto.creditCard).length > 0) {
    ZodHelpers.issue(ctx, 'creditCard', 'Credit card details can only be provided for credit card fee proposals.');
  }

  return dto;
});

export type CreateFeeProposalBodyDto = z.infer<typeof RestrictCreateFeeProposalBodySchema>;
