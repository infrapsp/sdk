import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';
import { FeeProposalStatus } from '../../../modules/types/fee_proposal/types.ts';

export const FeeProposalCreditCardResponseSchema = z.object({
  anticipation: z.number().int().nonnegative(),
  chargebackGuarantee: z.number().int().nonnegative(),
  mdr: z.array(z.object({
    installment: z.number().int().min(1).max(12),
    percent: z.number().int().min(0).max(10000),
  })).length(12),
}).or(EmptySchema);

export const FeeProposalResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  feeRuleId: ZodSchemas.nanoid().optional().nullable(),
  author: z.string().min(1).max(128),
  expirationDate: ZodSchemas.datetime(),
  period: z.number().int().min(1),
  triggerEntity: z.enum(FeeRuleEntity),
  method: z.enum(FeeRuleMethod),
  fundSchedule: z.number().nonnegative(),
  amountValue: z.number().int(),
  percentValue: z.number().int(),
  minAmount: z.number().int().min(0),
  maxAmount: z.number().int().max(999999999),
  creditCard: FeeProposalCreditCardResponseSchema,
  status: z.enum(FeeProposalStatus),
  name: z.string().max(255),
});

export type FeeProposalResponseDto = z.infer<typeof FeeProposalResponseSchema>;
