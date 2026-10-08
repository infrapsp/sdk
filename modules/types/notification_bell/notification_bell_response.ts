import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const NotificationBellResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'b2efdd02a13649ee97843' }),
  isSeen: z.boolean().openapi({ example: false }),
  content: z.string().openapi({ example: 'You have a new notification' }),
  createdAt: z.date().openapi({ example: '2021-09-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-09-01T00:00:00.000Z' }),
});

export type NotificationBellResponseDto = z.infer<typeof NotificationBellResponseSchema>;
