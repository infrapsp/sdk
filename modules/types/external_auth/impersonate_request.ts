import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const ImpersonateBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export type ImpersonateBodyDto = z.infer<typeof ImpersonateBodySchema>;
