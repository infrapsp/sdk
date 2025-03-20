import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRecordRequestType } from '../../../modules/types/merchant_record/types.ts';

export const CreateMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

const CreateMerchantRecordRequestBodySchema = z.object({
  request: z.nativeEnum(MerchantRecordRequestType),
});

const CreateMerchantRecordCommentBodySchema = z.object({
  title: z.string(),
  comment: z.string().optional(),
  attachments: z.array(z.instanceof(File)).or(z.instanceof(File)).transform((obj) => Array.isArray(obj) ? obj : [obj]).default([]),
});

export const CreateMerchantRecordBodySchema = CreateMerchantRecordCommentBodySchema.or(CreateMerchantRecordRequestBodySchema);

export type CreateMerchantRecordBodyDto = z.infer<typeof CreateMerchantRecordBodySchema>;
export type CreateMerchantRecordRequestBodyDto = z.infer<typeof CreateMerchantRecordRequestBodySchema>;
