import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const NotificationBellResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  isSeen: z.boolean(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationBellResponseDto = z.infer<typeof NotificationBellResponseSchema>;
