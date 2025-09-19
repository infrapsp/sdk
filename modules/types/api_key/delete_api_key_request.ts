import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const DeleteApiKeyParamsSchema = BaseParamsSchema;

export type DeleteApiKeyParamsDto = z.infer<typeof DeleteApiKeyParamsSchema>;
