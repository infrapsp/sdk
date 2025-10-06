import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { AnalysisStatus } from '../../../modules/types/aml/types.ts';

export const UpdateAnalysisParamsSchema = BaseParamsSchema;

export const UpdateAnalysisBodySchema = z.object({
  status: z.enum(AnalysisStatus),
  assigneeId: z.string(),
  isNotified: z.boolean(),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateAnalysisBodyDto = z.infer<typeof UpdateAnalysisBodySchema>;
