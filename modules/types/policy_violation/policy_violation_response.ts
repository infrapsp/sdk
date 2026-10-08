import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { PolicyViolationType } from '../../../modules/types/policy_violation/types.ts';

export const PolicyViolationResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'THWKs7PdM4ccrTx0EdaXf' }),
  tenantId: ZodSchemas.nanoid().openapi({ example: 'UjQuCJKuHy9v0334C89Nu' }),
  merchantId: ZodSchemas.nanoid().openapi({ example: 'upNWAg3eC8apERUqJx6yp' }),
  type: z.enum(PolicyViolationType).openapi({
    example: PolicyViolationType.SLC_BANK_NOT_ALLOWED,
    description: 'the type of policy violation detected',
  }),
  createdAt: z.date().openapi({ example: '2026-05-19T12:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2026-05-19T12:00:00.000Z' }),
  solvedAt: z.date().nullable().openapi({ example: null, description: 'when the violation was resolved, null if still active' }),
});

export type PolicyViolationResponseDto = z.infer<typeof PolicyViolationResponseSchema>;
