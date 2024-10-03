import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateMerchantRecordParamsSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const CreateMerchantRecordBodySchema = z.object({
  title: z.string(),
  comment: z.string().optional(),
  attachments: z.preprocess((obj) => Array.isArray(obj) ? obj : [obj], z.array(z.instanceof(File))).optional().default([]),
});

export type CreateMerchantRecordBodyDto = z.infer<typeof CreateMerchantRecordBodySchema>;
