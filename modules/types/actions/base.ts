import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BaseResponseSchema } from '../../../modules/types/base/responses.ts';
import { ActionStatus } from '../../../modules/types/actions/types.ts';

export const BaseActionBodySchema = z.object({
  maxAttempts: z.number().optional(),
  entityId: ZodSchemas.nanoid(),
});

export const BaseActionResponseSchema = BaseResponseSchema.and(z.object({
  response: z.record(z.unknown()),
  status: z.nativeEnum(ActionStatus),
  attempts: z.number(),
  maxAttempts: z.number(),
  entityId: ZodSchemas.nanoid(),
}));

export type ActionResponseDto = z.infer<typeof BaseActionResponseSchema>;
