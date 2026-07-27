import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CompensationResponseSchema = z.object({
  tenantId: z.string(),
  merchantId: z.string(),
  date: ZodSchemas.datetime(),
  compensatedAmount: z.number().int(),
});

export type CompensationResponseDto = z.infer<typeof CompensationResponseSchema>;
