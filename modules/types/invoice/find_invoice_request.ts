import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindInvoiceParamsSchema = BaseParamsSchema;

export const FindInvoiceQuerySchema = BaseQuerySchema.and(
  z.object({
    merchantId: ZodSchemas.nanoid().optional().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    tenantId: ZodSchemas.nanoid().optional().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
    period: ZodSchemas.alphanumeric().length(6).optional().openapi({ example: '202201' }),
    status: ZodSchemas.stringArray(z.enum(InvoiceStatus)).optional().openapi({
      description: 'comma-separated list of invoice status',
      example: [InvoiceStatus.ISSUED],
    }),
    notStatus: ZodSchemas.stringArray(z.enum(InvoiceStatus)).optional().openapi({
      description: 'comma-separated list of invoice status',
      example: InvoiceStatus.NOT_ISSUED,
    }),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt').openapi({
      description: 'field to be used to sort the results',
      default: 'createdAt',
    }),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC).openapi({ description: 'sort order', default: SortOrder.DESC }),
  }),
);

export type FindInvoiceParamsDto = z.infer<typeof FindInvoiceParamsSchema>;
export type FindInvoiceQueryDto = z.infer<typeof FindInvoiceQuerySchema>;
