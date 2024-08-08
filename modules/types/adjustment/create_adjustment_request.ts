import z from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AdjustmentStatus } from '../../../modules/types/adjustment/types.ts';

export const CreateAdjustmentBodySchema = z.object({
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.nativeEnum(AdjustmentStatus),
  amount: z.number(),
  description: z.string().max(320),
});

export type CreateAdjustmentBodyDto = z.infer<typeof CreateAdjustmentBodySchema>;
