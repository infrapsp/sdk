import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const UpdateMerchantParamsSchema = BaseParamsSchema;

export const UpdateMerchantBodySchema = z.object({
  metadata: z.record(z.string().or(z.number())),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantBodyDto = z.infer<typeof UpdateMerchantBodySchema>;
