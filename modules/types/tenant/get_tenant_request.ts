import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const GetTenantParamSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export const GetTenantRequestSchema = GetTenantParamSchema;

export type GetTenantParamDto = z.infer<typeof GetTenantParamSchema>;
export type GetTenantRequestDto = z.infer<typeof GetTenantRequestSchema>;
