import z from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const UpdateTierBodySchema = z.object({
  tier: z.number().int().nonnegative(),
  transferDailyLimit: z.number().int().nonnegative(),
  transferMonthlyLimit: z.number().int().nonnegative(),
}).partial().transform((dto, ctx) => {
  if (dto.transferDailyLimit && !dto.transferMonthlyLimit) {
    ZodHelpers.issue(ctx, 'transferMonthlyLimit', 'should change both limits');
  }
  if (dto.transferMonthlyLimit && !dto.transferDailyLimit) {
    ZodHelpers.issue(ctx, 'transferDailyLimit', 'should change both limits');
  }
  if (dto.transferMonthlyLimit && dto.transferDailyLimit && dto.transferDailyLimit > dto.transferMonthlyLimit) {
    ZodHelpers.issue(ctx, 'transferDailyLimit', 'transferDailyLimit cannot be greater than transferMonthlyLimit');
  }

  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export const UpdateTierParamsSchema = BaseParamsSchema;

export type UpdateTierParamsDto = z.infer<typeof UpdateTierParamsSchema>;
export type UpdateTierBodyDto = z.infer<typeof UpdateTierBodySchema>;
