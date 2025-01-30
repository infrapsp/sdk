import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const FindExternalAuthQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export type FindExternalAuthQueryDto = z.infer<typeof FindExternalAuthQuerySchema>;
