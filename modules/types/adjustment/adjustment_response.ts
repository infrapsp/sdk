import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AdjustmentStatus } from '../../../modules/types/adjustment/types.ts';

export const AdjustmentResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.nativeEnum(AdjustmentStatus),
  amount: z.number(),
  description: z.string().max(320),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AdjustmentResponseDto = z.infer<typeof AdjustmentResponseSchema>;
