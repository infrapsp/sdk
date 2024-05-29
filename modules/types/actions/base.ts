import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

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
