import { z } from 'npm:@hono/zod-openapi@1.4.0';
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
}).openapi({ title: 'Credit card fees' }).or(EmptySchema.openapi({ title: 'Empty' }));

export const FeeProposalResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'THWKs7PdM4ccrTx0EdaXf' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
  feeRuleId: ZodSchemas.nanoid().optional().nullable().openapi({
    example: 'THWKs7PdM4ccrTx0EdaXf',
    description: 'the fee rule created from this proposal (only set when accepted)',
  }),
  author: z.string().min(1).max(128).openapi({ example: 'John Doe', description: 'the person who created this proposal' }),
  expirationDate: ZodSchemas.datetime().openapi({ example: '2026-12-31T23:59:59Z', description: 'when this proposal expires' }),
  period: z.number().int().min(1).openapi({ example: 30, description: 'the number of days this fee rule will be active (if accepted)' }),
  triggerEntity: z.enum(FeeRuleEntity).openapi({ example: FeeRuleEntity.TRANSACTION, description: 'the entity that this proposal is applied to' }),
  method: z.enum(FeeRuleMethod).openapi({ example: FeeRuleMethod.PIX, description: 'the payment method that this proposal applies to' }),
  fundSchedule: z.number().nonnegative().openapi({
    example: 0,
    description: 'determines when the funds will be available to the merchant (if accepted)',
  }),
  amountValue: z.number().int().openapi({ example: 30, description: 'the fixed amount value charged in cents' }),
  percentValue: z.number().int().openapi({ example: 99, description: 'the percentage value charged in base points (1,00% = 100)' }),
  minAmount: z.number().int().min(0).openapi({ example: 0, description: 'minimum amount charged' }),
  maxAmount: z.number().int().max(999999999).openapi({ example: 999999999, description: 'the maximum amount charged' }),
  creditCard: FeeProposalCreditCardResponseSchema.openapi({
    example: {
      anticipation: 150,
      chargebackGuarantee: 200,
      mdr: [
        { installment: 1, percent: 250 },
        { installment: 2, percent: 280 },
      ],
    },
    description: 'credit card specific fees (only for credit card method)',
  }),
  status: z.enum(FeeProposalStatus).openapi({ example: FeeProposalStatus.CREATED, description: 'the current status of this proposal' }),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().max(255).openapi({ example: 'Q1 2026 Fee Proposal', description: 'the name of the fee proposal' }),
});

export type FeeProposalResponseDto = z.infer<typeof FeeProposalResponseSchema>;
