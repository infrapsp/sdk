import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const ImpersonateBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export type ImpersonateBodyDto = z.infer<typeof ImpersonateBodySchema>;
