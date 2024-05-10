import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { ActionStatus } from '../../../modules/types/actions/types.ts';

export const BaseActionBodySchema = z.object({
  maxAttempts: z.number().optional(),
  entityId: ZodSchemas.nanoid(),
});

export const BaseActionResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  response: z.record(z.unknown()),
  status: z.nativeEnum(ActionStatus),
  attempts: z.number(),
  maxAttempts: z.number(),
  entityId: ZodSchemas.nanoid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ActionResponseDto = z.infer<typeof BaseActionResponseSchema>;

// Worker
export const BaseWorkerBodySchema = z.object({
  id: ZodSchemas.nanoid(),
  entityId: ZodSchemas.nanoid(),
});

export const BaseWorkerResponseSchema = z.object({
  shouldRetry: z.boolean(),
  data: z.record(z.unknown()),
});

export type WorkerResponseDto = z.infer<typeof BaseWorkerResponseSchema>;
