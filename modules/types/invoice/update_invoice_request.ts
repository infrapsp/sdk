import { z } from 'npm:@hono/zod-openapi@1.1.0';
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
  metadata: z.record(z.string(), z.string().or(z.number())),
  status: z.enum(InvoiceStatus),
  issuedData: UpdateInvoiceIssuedDataSchema,
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateInvoiceBodyDto = z.infer<typeof UpdateInvoiceBodySchema>;
