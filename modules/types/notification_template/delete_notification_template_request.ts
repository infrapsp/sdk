import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';

export const DeleteNotificationTemplateParamsSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
});
