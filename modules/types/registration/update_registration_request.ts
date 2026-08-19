import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const UpdateRegistrationParamsSchema = BaseParamsSchema;

export const UpdateRegistrationBodySchema = z.object({
  assigneeId: z.string().nullable(),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateRegistrationBodyDto = z.infer<typeof UpdateRegistrationBodySchema>;
