import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';

export const UpdateInvoiceParamsSchema = BaseParamsSchema;

export const UpdateInvoiceIssuedDataSchema = z.object({
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
  issuedData: UpdateInvoiceIssuedDataSchema,
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateInvoiceBodyDto = z.infer<typeof UpdateInvoiceBodySchema>;
