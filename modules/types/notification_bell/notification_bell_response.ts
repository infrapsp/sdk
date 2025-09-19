import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const NotificationBellResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  isSeen: z.boolean(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationBellResponseDto = z.infer<typeof NotificationBellResponseSchema>;
