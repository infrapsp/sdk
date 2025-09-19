import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AdjustmentStatus } from '../../../modules/types/adjustment/types.ts';

export const AdjustmentResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.enum(AdjustmentStatus),
  amount: z.number(),
  description: z.string().max(320),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AdjustmentResponseDto = z.infer<typeof AdjustmentResponseSchema>;
