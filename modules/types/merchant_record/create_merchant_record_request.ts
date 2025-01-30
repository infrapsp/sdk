import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const CreateMerchantRecordBodySchema = z.object({
  title: z.string(),
  comment: z.string().optional(),
  attachments: z.array(z.instanceof(File)).or(z.instanceof(File)).transform((obj) => Array.isArray(obj) ? obj : [obj]).default([]),
});

export type CreateMerchantRecordBodyDto = z.infer<typeof CreateMerchantRecordBodySchema>;
