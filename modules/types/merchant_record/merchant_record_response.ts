import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const MerchantRecordResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  title: z.string(),
  comment: z.string().nullable().optional(),
  attachments: z.array(z.object({
    path: z.string(),
  })),
  externalUserId: z.string(),
  createdAt: z.date(),
});

export type MerchantRecordResponseDto = z.infer<typeof MerchantRecordResponseSchema>;
