import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';
import { RecordStatus } from '../../../modules/types/record/types.ts';

export const UpdateRecordParamsSchema = BaseParamsSchema;

export const UpdateRecordBodySchema = z.object({
  status: z.enum(RecordStatus),
}).partial().transform((dto, ctx) => {
  if (Object.keys(dto).length === 0) {
    ZodHelpers.issue(ctx, 'body', 'At least one field must be provided');
  }

  return dto;
});

export type UpdateRecordBodyDto = z.infer<typeof UpdateRecordBodySchema>;
