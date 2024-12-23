import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';

export const UpdateInvoiceParamsSchema = BaseParamsSchema;

export const UpdateInvoiceIssuedData = z.object({
  number: z.string().max(128),
  url: z.string().max(200),
  checkCode: z.string().max(128),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export const UpdateInvoiceBodySchema = z.object({
  metadata: z.record(z.string().or(z.number())),
  status: z.nativeEnum(InvoiceStatus),
  issuedData: UpdateInvoiceIssuedData,
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateInvoiceBodyDto = z.infer<typeof UpdateInvoiceBodySchema>;
