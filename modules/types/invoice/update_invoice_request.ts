import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';

export const UpdateInvoiceParamsSchema = BaseParamsSchema;

export const UpdateInvoiceBodySchema = z.object({
  metadata: z.record(z.string().or(z.number())),
  status: z.nativeEnum(InvoiceStatus),
  number: ZodSchemas.alphanumeric().max(128).nullable(),
  contentUrl: z.string().max(200).nullable(),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateInvoiceBodyDto = z.infer<typeof UpdateInvoiceBodySchema>;
