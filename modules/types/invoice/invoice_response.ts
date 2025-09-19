import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';

export const InvoiceLineResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  description: z.string(),
  amount: z.number().int(),
  createdAt: z.date(),
});

export const InvoiceIssuedDataResponseSchema = z.object({
  number: z.string().optional(),
  url: z.string().optional(),
  checkCode: z.string().optional(),
});

export const InvoiceResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.enum(InvoiceStatus),
  totalAmount: z.number().int(),
  period: z.string().length(6),
  issuedData: InvoiceIssuedDataResponseSchema,
  lines: z.array(InvoiceLineResponseSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type InvoiceResponseDto = z.infer<typeof InvoiceResponseSchema>;
