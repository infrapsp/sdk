import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRecordStatus } from '../../../modules/types/merchant_record/types.ts';

export const UpdateMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
}).and(BaseParamsSchema);

export const UpdateMerchantRecordBodySchema = z.object({
  status: z.enum(MerchantRecordStatus),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateMerchantRecordBodyDto = z.infer<typeof UpdateMerchantRecordBodySchema>;
