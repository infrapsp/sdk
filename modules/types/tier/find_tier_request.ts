import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const FindTierParamsSchema = BaseParamsSchema;

export type FindTierParamsDto = z.infer<typeof FindTierParamsSchema>;
