import z from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TierResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tier: z.number(),
  transferDailyLimit: z.number(),
  transferMonthlyLimit: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TierResponseDto = z.infer<typeof TierResponseSchema>;
