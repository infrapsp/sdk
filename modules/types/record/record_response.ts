import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { RecordRequestType, RecordStatus } from '../../../modules/types/record/types.ts';

export const RecordMerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tierId: ZodSchemas.nanoid(),
  status: z.enum(MerchantStatus),
  documentNumber: z.string(),
  documentType: z.enum(DocumentType),
  externalId: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  personName: z.string(),
  personEmail: z.email(),
  url: z.string(),
  createdAt: z.date(),
});

export const RecordResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  title: z.string(),
  comment: z.string().nullable().optional(),
  request: z.enum(RecordRequestType).nullable().optional(),
  status: z.enum(RecordStatus),
  attachments: z.array(z.object({
    path: z.string(),
  })),
  externalUserId: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  merchant: RecordMerchantResponseSchema,
});

export type RecordResponseDto = z.infer<typeof RecordResponseSchema>;
