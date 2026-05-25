import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PolicyViolationType } from '../../../modules/types/policy_violation/types.ts';

export const PolicyViolationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  type: z.enum(PolicyViolationType),
  createdAt: z.date(),
  updatedAt: z.date(),
  solvedAt: z.date().nullable(),
});

export type PolicyViolationResponseDto = z.infer<typeof PolicyViolationResponseSchema>;
