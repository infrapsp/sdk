import { BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const FindNotificationTemplateQuerySchema = BaseQuerySchema;

export const FindNotificationTemplateParamsSchema = z.object({
  id: ZodSchemas.alphanumericWithDash(),
});
