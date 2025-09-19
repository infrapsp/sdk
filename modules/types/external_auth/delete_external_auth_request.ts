import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const DeleteExternalAuthParamSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export type DeleteExternalAuthParamDto = z.infer<typeof DeleteExternalAuthParamSchema>;
