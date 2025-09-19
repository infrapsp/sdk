import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';

export const FindFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
});

export const RestrictFindFeeRuleQuerySchema = z.object({
  isEnabled: z.boolean().optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  method: z.enum(FeeRuleMethod).optional(),
  triggerEntity: z.enum(FeeRuleEntity).optional(),
});

export type FindFeeRuleQueryDto = z.infer<typeof FindFeeRuleQuerySchema>;
export type RestrictFindFeeRuleQueryDto = z.infer<typeof RestrictFindFeeRuleQuerySchema>;
