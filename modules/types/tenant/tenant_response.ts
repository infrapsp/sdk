import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TenantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TenantResponseDto = z.infer<typeof TenantResponseSchema>;
