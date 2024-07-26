import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
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
    number: ZodSchemas.alphanumeric().max(128).optional(),
    contentUrl: z.string().optional(),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
).transform((dto, ctx) => {
  ZodRefines.validDateRange(ctx, dto.createdAtGte, dto.createdAtLte, 1000 * 60 * 60 * 24 * 30 * 12, 'createdAt');

  return dto;
});

export type FindInvoiceParamsDto = z.infer<typeof FindInvoiceParamsSchema>;
export type FindInvoiceQueryDto = z.infer<typeof FindInvoiceQuerySchema>;
