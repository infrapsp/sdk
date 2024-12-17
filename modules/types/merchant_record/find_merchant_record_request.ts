import { ZodSchemas } from '../../../modules/types/zod.ts';
import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';

export const FindMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const FindMerchantRecordQuerySchema = BaseQuerySchema;

export type FindMerchantRecordParamsDto = z.infer<typeof FindMerchantRecordParamsSchema>;
export type FindMerchantRecordQueryDto = z.infer<typeof FindMerchantRecordQuerySchema>;
