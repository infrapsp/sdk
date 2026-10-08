import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const UpdateFeeRuleBodySchema = z.object({
  isEnabled: z.boolean().openapi({ example: true, description: 'determines if the rule is enabled' }),
});

export const UpdateFeeRuleQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
});

export const UpdateFeeRuleParamsSchema = BaseParamsSchema;

export type UpdateFeeRuleBodyDto = z.infer<typeof UpdateFeeRuleBodySchema>;
export type UpdateFeeRuleParamsDto = z.infer<typeof UpdateFeeRuleParamsSchema>;
export type UpdateFeeRuleQueryDto = z.infer<typeof UpdateFeeRuleQuerySchema>;
