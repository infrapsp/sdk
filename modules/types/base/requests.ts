import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

export const BaseParamsSchema = z.object({
  id: ZodSchemas.nanoid(),
});
