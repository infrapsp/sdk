import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CompensationItemResponseSchema = z.object({
  tenantId: ZodSchemas.nanoid().openapi({ example: 'j9cQwAr3KXolCLSYWleOG' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'zZebjp82qsenXXnu947f6' }),
  payableId: ZodSchemas.nanoid().openapi({
    description: 'payable being compensated',
    example: 'v1vvAMmAePFJdkAU073hc',
  }),
  transactionId: ZodSchemas.nanoid().nullable().openapi({
    description: 'transaction that originated the compensated payable',
    example: 'CRutyJmJHin46NXnRdCjN',
  }),
  payablePaymentDate: z.date().openapi({
    description: 'payment date of the compensated payable',
    example: '2021-09-01T03:00:00.000Z',
  }),
  urPaymentDate: z.date().openapi({
    description: 'payment date of the unit receivable debited by this item',
    example: '2021-09-01T03:00:00.000Z',
  }),
  amount: z.number().int().openapi({ description: 'amount in cents taken from the unit receivable', example: 1000 }),
  createdAt: z.date().openapi({ example: '2021-09-01T00:00:00.000Z' }),
});

export type CompensationItemResponseDto = z.infer<typeof CompensationItemResponseSchema>;
