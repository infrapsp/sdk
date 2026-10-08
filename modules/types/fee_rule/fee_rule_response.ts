import { z } from 'npm:@hono/zod-openapi@1.4.0';
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
}).openapi({ title: 'Credit card fees' }).or(EmptySchema.openapi({ title: 'Empty' }));

export const FeeRuleResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'THWKs7PdM4ccrTx0EdaXf' }),
  merchantId: ZodSchemas.nanoid().nullable().optional().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
  name: z.string().openapi({ example: 'default rule' }),
  fundSchedule: z.number().nonnegative().openapi({ example: 0, description: 'determines when the funds will be available to the merchant' }),
  method: z.enum(FeeRuleMethod).openapi({ example: FeeRuleMethod.PIX, description: 'the payment method that this rule applies to' }),
  triggerEntity: z.enum(FeeRuleEntity).openapi({ example: FeeRuleEntity.TRANSACTION, description: 'the entity that this rule is applied to' }),
  amountValue: z.number().int().openapi({ example: 30, description: 'the fixed amount value charged in cents' }),
  percentValue: z.number().int().openapi({ example: 99, description: 'the percentage value charged in base points (1,00% = 100)' }),
  minAmount: z.number().int().openapi({ example: 0, description: 'minimum amount charged' }),
  maxAmount: z.number().int().openapi({ example: 999999999, description: 'the maximum amount charged' }),
  startDate: z.date().openapi({
    example: '2022-01-01T00:00:00Z',
    description: 'start time that this rule will be active and be used to charge operations',
  }),
  endDate: z.date().openapi({
    example: '2022-12-31T23:59:59Z',
    description: 'end time that this rule will be active and be used to charge operations',
  }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00Z', description: 'creation time of the fee rule' }),
  creditCard: FeeRuleCreditCardResponseSchema.openapi({
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
});

export type FeeRuleResponseDto = z.infer<typeof FeeRuleResponseSchema>;
