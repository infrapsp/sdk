import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CompensationResponseSchema = z.object({
  tenantId: z.string().openapi({ example: 'UjQuCJKuHy9v0334C89Nu' }),
  merchantId: z.string().openapi({ example: 'j9cQwAr3KXolCLSYWleOG' }),
  date: ZodSchemas.datetime().openapi({
    description: 'aggregation date — payable payment date or unit receivable payment date, depending on which filter was used',
    example: '2026-07-10T00:00:00.000Z',
  }),
  compensatedAmount: z.number().int().openapi({ description: 'sum of the compensated amount for the tenant/merchant/date bucket', example: 1500 }),
});

export type CompensationResponseDto = z.infer<typeof CompensationResponseSchema>;
