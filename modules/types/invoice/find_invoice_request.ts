import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindInvoiceParamsSchema = BaseParamsSchema;

export const FindInvoiceQuerySchema = BaseQuerySchema.and(
  z.object({
    merchantId: ZodSchemas.nanoid().optional(),
    tenantId: ZodSchemas.nanoid().optional(),
    period: ZodSchemas.alphanumeric().length(6).optional(),
    status: ZodSchemas.stringArray(z.nativeEnum(InvoiceStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(InvoiceStatus)).optional(),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
);

export type FindInvoiceParamsDto = z.infer<typeof FindInvoiceParamsSchema>;
export type FindInvoiceQueryDto = z.infer<typeof FindInvoiceQuerySchema>;
