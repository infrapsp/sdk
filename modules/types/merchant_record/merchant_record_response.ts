import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRecordRequestType, MerchantRecordStatus } from '../../../modules/types/merchant_record/types.ts';
import { DocumentType, MerchantStatus } from '../../../modules/types/merchant/types.ts';

export const MerchantRecordMerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tierId: ZodSchemas.nanoid(),
  status: z.nativeEnum(MerchantStatus),
  documentNumber: z.string(),
  documentType: z.nativeEnum(DocumentType),
  externalId: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  personName: z.string(),
  personEmail: z.string().email(),
  url: z.string(),
  createdAt: z.date(),
});

export const MerchantRecordResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  title: z.string(),
  comment: z.string().nullable().optional(),
  request: z.nativeEnum(MerchantRecordRequestType).nullable().optional(),
  status: z.nativeEnum(MerchantRecordStatus),
  attachments: z.array(z.object({
    path: z.string(),
  })),
  externalUserId: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MerchantRecordRequestResponseSchema = MerchantRecordResponseSchema.and(z.object({
  merchant: MerchantRecordMerchantResponseSchema,
}));

export type MerchantRecordResponseDto = z.infer<typeof MerchantRecordResponseSchema>;
export type MerchantRecordRequestResponseDto = z.infer<typeof MerchantRecordRequestResponseSchema>;
