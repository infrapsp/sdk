import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType, MerchantStatus } from '../../../modules/types/merchant/types.ts';
import { RecordEntity, RecordRequestType, RecordStatus } from '../../../modules/types/record/types.ts';

export const RecordMerchantResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  tierId: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  status: z.enum(MerchantStatus),
  documentNumber: z.string().openapi({ description: 'cpf or cnpj number without punctuation', example: '88550339997' }),
  documentType: z.enum(DocumentType).openapi({ example: DocumentType.CPF }),
  externalId: z.string().nullable().optional().openapi({ example: 'externalId' }),
  companyName: z.string().nullable().optional().openapi({ example: 'company name' }),
  personName: z.string().openapi({ example: 'person name' }),
  personEmail: z.email().openapi({ example: 'person@email.com' }),
  url: z.string().openapi({ example: 'https://example.com' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export const RecordResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'EngmKkhbAoJhM0RPUQd6a' }),
  title: z.string().openapi({ example: 'merchant changed login email' }),
  comment: z.string().nullable().optional().openapi({ example: 'merchant changed because it was wrong' }),
  request: z.enum(RecordRequestType).nullable().optional().openapi({ example: RecordRequestType.TIER_UPGRADE }),
  status: z.enum(RecordStatus).openapi({ example: RecordStatus.APPROVED }),
  entity: z.enum(RecordEntity),
  entityId: z.string(),
  attachments: z.array(z.object({
    path: z.string(),
  })).openapi({ description: 'list containing file or blob instances', example: [] }),
  externalUserId: z.string().nullable().optional().openapi({ example: 'EngmKkhbAo' }),
  assigneeId: z.string().nullable().optional().openapi({ example: 'EngmKkhbAo' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00.000Z' }),
  merchant: RecordMerchantResponseSchema.nullable().optional(),
});

export type RecordResponseDto = z.infer<typeof RecordResponseSchema>;
