import { ZodSchemas } from '../../../modules/types/zod.ts';
import z from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const FindFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
});

export const FindFeeRuleParamsSchema = BaseParamsSchema;

export type FindFeeRuleQueryDto = z.infer<typeof FindFeeRuleQuerySchema>;
export type FindFeeRuleParamsDto = z.infer<typeof FindFeeRuleParamsSchema>;
