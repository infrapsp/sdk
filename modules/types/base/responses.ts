import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const BaseResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
