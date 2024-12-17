import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const GetTenantParamSchema = z.object({
  id: ZodSchemas.nanoid(),
});

export const GetTenantRequestSchema = GetTenantParamSchema;

export type GetTenantParamDto = z.infer<typeof GetTenantParamSchema>;
export type GetTenantRequestDto = z.infer<typeof GetTenantRequestSchema>;
