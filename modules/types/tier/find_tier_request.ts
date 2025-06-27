import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const FindTierParamsSchema = BaseParamsSchema;

export type FindTierParamsDto = z.infer<typeof FindTierParamsSchema>;
