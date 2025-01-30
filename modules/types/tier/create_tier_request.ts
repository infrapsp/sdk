import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const CreateTierBodySchema = z.object({
  tier: z.number().int().nonnegative(),
  transferDailyLimit: z.number().int().nonnegative(),
  transferMonthlyLimit: z.number().int().nonnegative(),
}).transform((dto, ctx) => {
  if (dto.transferDailyLimit > dto.transferMonthlyLimit) {
    ZodHelpers.issue(ctx, 'transferDailyLimit', 'transferDailyLimit cannot be greater than transferMonthlyLimit');
  }

  return dto;
});

export type CreateTierBodyDto = z.infer<typeof CreateTierBodySchema>;
