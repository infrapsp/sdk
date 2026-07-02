import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { RegistrationStatus, RegistrationType } from '../../../modules/types/registration/types.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';

export const FindRegistrationQuerySchema = z.object({
  createdAtLte: ZodSchemas.datetime().optional(),
  createdAtGte: ZodSchemas.datetime().optional(),
  page: z.coerce.number().positive().int().default(1),
  pageSize: z.coerce.number().positive().int().max(1000).default(10),
  merchantId: ZodSchemas.nanoid().optional(),
  externalUserId: z.string().optional(),
  type: z.enum(RegistrationType).optional(),
  status: ZodSchemas.stringArray(z.enum(RegistrationStatus)).optional(),
  documentType: z.enum(DocumentType).optional(),
  documentNumber: z.string().optional(),
  search: z.string().optional(),
  sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
});

export const FindRegistrationParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindRegistrationQueryDto = z.infer<typeof FindRegistrationQuerySchema>;
