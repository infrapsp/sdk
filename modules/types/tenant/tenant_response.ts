import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TenantResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TenantResponseDto = z.infer<typeof TenantResponseSchema>;
