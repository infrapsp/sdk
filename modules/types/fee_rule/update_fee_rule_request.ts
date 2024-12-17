import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const UpdateFeeRuleBodySchema = z.object({
  isEnabled: z.boolean(),
});

export const UpdateFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional(),
});

export const UpdateFeeRuleParamsSchema = BaseParamsSchema;

export type UpdateFeeRuleBodyDto = z.infer<typeof UpdateFeeRuleBodySchema>;
export type UpdateFeeRuleParamsDto = z.infer<typeof UpdateFeeRuleParamsSchema>;
export type UpdateFeeRuleQueryDto = z.infer<typeof UpdateFeeRuleQuerySchema>;
