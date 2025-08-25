import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';

export const FeeRuleCreditCardResponseSchema = z.object({
  anticipation: z.number().int(),
  chargebackGuarantee: z.number().int(),
  mdr: z.array(z.object({
    installment: z.number().int(),
    percent: z.number().int(),
  })),
}).or(EmptySchema);

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
  creditCard: FeeRuleCreditCardResponseSchema,
});

export type FeeRuleResponseDto = z.infer<typeof FeeRuleResponseSchema>;
