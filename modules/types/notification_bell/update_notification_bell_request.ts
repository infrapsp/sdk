import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';

export const UpdateNotificationBellBodySchema = z.object({
  id: ZodSchemas.nanoid(),
});

export const UpdateManyNotificationBellBodySchema = z.array(UpdateNotificationBellBodySchema).max(50);

export type UpdateNotificationBellBodyDto = z.infer<typeof UpdateNotificationBellBodySchema>;
export type UpdateManyNotificationBellBodyDto = z.infer<typeof UpdateManyNotificationBellBodySchema>;
