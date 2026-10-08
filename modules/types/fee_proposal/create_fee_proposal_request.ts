import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { EmptySchema } from '../../../modules/types/base/requests.ts';
import { FeeProposalStatus } from '../../../modules/types/fee_proposal/types.ts';

export const CreateFeeProposalCreditCardBodySchema = z.object({
  anticipation: z.number().int().nonnegative(),
  chargebackGuarantee: z.number().int().nonnegative(),
  mdr: z.array(z.object({
    installment: z.number().int().min(1).max(12),
    percent: z.number().int().min(0).max(10000),
  })).length(12),
}).openapi({ title: 'Credit card fees' }).or(EmptySchema.openapi({ title: 'Empty' }));

export const RestrictCreateFeeProposalBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
  author: z.string().min(1).max(128).openapi({ example: 'John Doe', description: 'the person creating this proposal' }),
  expirationDate: ZodSchemas.datetime().openapi({ example: '2026-12-31T23:59:59Z', description: 'when this proposal expires' }),
  period: z.number().int().min(1).openapi({ example: 30, description: 'the number of days the fee rule will be active if accepted' }),
  method: z.enum(FeeRuleMethod).openapi({ example: FeeRuleMethod.PIX, description: 'the payment method this proposal applies to' }),
  triggerEntity: z.enum(FeeRuleEntity).openapi({ example: FeeRuleEntity.TRANSACTION, description: 'the entity this proposal is applied to' }),
  fundSchedule: z.number().nonnegative().openapi({ example: 0, description: 'determines when funds will be available to the merchant' }),
  amountValue: z.number().int().openapi({ example: 30, description: 'the fixed amount value charged in cents' }),
  percentValue: z.number().int().openapi({ example: 99, description: 'the percentage value charged in base points (1,00% = 100)' }),
  minAmount: z.number().int().min(0).openapi({ example: 0, description: 'minimum amount charged' }),
  maxAmount: z.number().int().max(999999999).openapi({ example: 999999999, description: 'the maximum amount charged' }),
  creditCard: CreateFeeProposalCreditCardBodySchema.openapi({
    example: {
      anticipation: 150,
      chargebackGuarantee: 200,
      mdr: Array.from({ length: 12 }, (_, i) => ({
        installment: i + 1,
        percent: 250 + (i * 30),
      })),
    },
    description: 'credit card specific fees (required for credit card method)',
  }),
  name: z.string().max(255).openapi({ example: 'Q1 2026 Fee Proposal', description: 'the name of the fee proposal' }),
  status: z.enum([FeeProposalStatus.CREATED, FeeProposalStatus.ACCEPTED]).optional(),
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
