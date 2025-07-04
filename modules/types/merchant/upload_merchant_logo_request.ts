import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const UploadMerchantLogoBodySchema = z.object({
  logo: z.instanceof(File),
}).transform((dto, ctx) => {
  if (dto.logo.size > 1024 * 1024 * 5) {
    ZodHelpers.issue(ctx, 'logo', 'File size must be less than 5MB.');
  }

  if (!['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(dto.logo.type)) {
    ZodHelpers.issue(ctx, 'logo', 'Invalid file type. Only PNG, JPG, JPEG and WEBP are allowed.');
  }

  return dto;
});

export const UploadMerchantLogoParamsSchema = BaseParamsSchema;

export type UploadMerchantLogoBodyDto = z.infer<typeof UploadMerchantLogoBodySchema>;
