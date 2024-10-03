import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const DeleteExternalAuthParamSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export type DeleteExternalAuthParamDto = z.infer<typeof DeleteExternalAuthParamSchema>;
