import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const FindExternalAuthQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export type FindExternalAuthQueryDto = z.infer<typeof FindExternalAuthQuerySchema>;
