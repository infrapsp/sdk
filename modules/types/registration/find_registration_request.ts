import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { RegistrationStatus, RegistrationType } from '../../../modules/types/registration/types.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';

export const FindRegistrationQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().optional().openapi({
    description: 'filter by createdAt less than or equal to',
    example: '2021-01-02T02:59:59.999Z',
  }),
  createdAtGte: ZodSchemas.datetime().optional().openapi({
    description: 'filter by createdAt greater than or equal to',
    example: '2021-01-01T03:00:00.000Z',
  }),
  page: z.coerce.number().positive().int().default(1).openapi({ description: 'page number', example: 1 }),
  pageSize: z.coerce.number().positive().int().max(1000).default(10).openapi({ description: 'number of items per page', example: 10 }),
  merchantId: ZodSchemas.nanoid().optional().openapi({ description: 'filter by merchant id', example: 'EngmKkhbAoJhM0RPUQd6a' }),
  externalUserId: z.string().optional().openapi({ description: 'filter by external user id', example: 'externalUserId' }),
  type: z.enum(RegistrationType).optional().openapi({ description: 'filter by registration type', example: RegistrationType.REGULARIZATION }),
  status: ZodSchemas.stringArray(z.enum(RegistrationStatus)).optional().openapi({
    description: 'comma-separated list of registration status',
    example: [RegistrationStatus.APPROVED],
  }),
  documentType: z.enum(DocumentType).optional().openapi({ description: 'filter by document type', example: DocumentType.CPF }),
  documentNumber: z.string().optional().openapi({ description: 'filter by document number', example: '12345678900' }),
  search: z.string().optional().openapi({ description: 'open search string field', example: 'search' }),
  sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt').openapi({
    description: 'field to be used to sort the results',
    default: 'createdAt',
  }),
  sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', default: SortOrder.DESC }),
});

export const FindRegistrationParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindRegistrationQueryDto = z.infer<typeof FindRegistrationQuerySchema>;
