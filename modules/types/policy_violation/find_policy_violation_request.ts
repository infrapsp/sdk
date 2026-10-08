import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const RestrictFindPolicyViolationQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
  withSolved: ZodSchemas.stringBoolean().optional().openapi({
    example: 'true',
    description: 'when true, returns all violations including already solved ones (default: only active violations)',
  }),
});
