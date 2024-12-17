import { ZodSchemas } from '../../../modules/types/zod.ts';
import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { FeeRuleEntity, FeeRuleMethod } from '../../../modules/types/fee_rule/types.ts';

export const FindFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
});

export const RestrictFindFeeRuleQuerySchema = z.object({
  isEnabled: z.boolean().optional(),
  merchantId: ZodSchemas.nanoid().optional(),
  method: z.nativeEnum(FeeRuleMethod).optional(),
  triggerEntity: z.nativeEnum(FeeRuleEntity).optional(),
});

export const FindFeeRuleParamsSchema = BaseParamsSchema;

export type FindFeeRuleQueryDto = z.infer<typeof FindFeeRuleQuerySchema>;
export type FindFeeRuleParamsDto = z.infer<typeof FindFeeRuleParamsSchema>;
export type RestrictFindFeeRuleQueryDto = z.infer<typeof RestrictFindFeeRuleQuerySchema>;
