import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AmlEntity } from '../../../modules/types/aml/types.ts';

export const AnalyzeBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  entity: z.enum(AmlEntity),
  entityId: ZodSchemas.nanoid(),
  payload: z.record(z.string(), z.unknown()),
});

export type AnalyzeBodyDto = z.infer<typeof AnalyzeBodySchema>;
