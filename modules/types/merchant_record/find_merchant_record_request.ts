import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';

export const FindMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const FindMerchantRecordQuerySchema = BaseQuerySchema;

export type FindMerchantRecordParamsDto = z.infer<typeof FindMerchantRecordParamsSchema>;
export type FindMerchantRecordQueryDto = z.infer<typeof FindMerchantRecordQuerySchema>;
