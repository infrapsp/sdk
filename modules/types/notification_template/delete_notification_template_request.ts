import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const DeleteNotificationTemplateParamsSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
});
