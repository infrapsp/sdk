import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const RestrictFindPolicyViolationQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  withSolved: ZodSchemas.stringBoolean().optional(),
});
