import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const UploadMerchantLogoBodySchema = z.object({
  logo: z.instanceof(File),
}).transform((dto, ctx) => {
  if (dto.logo.size > 1024 * 1024 * 5) {
    ZodHelpers.issue(ctx, 'logo', 'File size must be less than 5MB.');
  }

  if (!['image/png', 'image/jpg', 'image/jpeg'].includes(dto.logo.type)) {
    ZodHelpers.issue(ctx, 'logo', 'Invalid file type. Only PNG, JPG and JPEG are allowed.');
  }

  return dto;
});

export const UploadMerchantLogoParamsSchema = BaseParamsSchema;

export type UploadMerchantLogoBodyDto = z.infer<typeof UploadMerchantLogoBodySchema>;
