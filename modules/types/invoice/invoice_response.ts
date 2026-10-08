import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { InvoiceStatus } from '../../../modules/types/invoice/types.ts';

export const InvoiceLineResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: '8mppermyRNc0aCbI8OKK4' }),
  description: z.string().openapi({ example: 'Taxes' }),
  amount: z.number().int().openapi({ example: 1000 }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
});

export const InvoiceIssuedDataResponseSchema = z.object({
  number: z.string().optional().openapi({ example: '202200' }),
  url: z.string().optional().openapi({ example: 'https://www.example.com/invoices/202200' }),
  checkCode: z.string().optional().openapi({ example: '1234567890' }),
});

export const InvoiceResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'DTG1mut6wgTmJY0zmIjYo' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'bRkewl3nR7d9ewQ6OCfdY' }),
  provider: z.string().or(z.null()),
  status: z.enum(InvoiceStatus).openapi({ example: InvoiceStatus.ISSUED }),
  totalAmount: z.number().int().openapi({ example: 1000 }),
  period: z.string().length(6).openapi({ example: '202200' }),
  issuedData: InvoiceIssuedDataResponseSchema,
  lines: z.array(InvoiceLineResponseSchema).openapi({ description: 'detailed description of the lines that make up the invoice' }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
});

export type InvoiceResponseDto = z.infer<typeof InvoiceResponseSchema>;
