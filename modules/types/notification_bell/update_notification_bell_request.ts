import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const UpdateNotificationBellBodySchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'b2efdd02a13649ee97843' }),
});

export const UpdateManyNotificationBellBodySchema = z.array(UpdateNotificationBellBodySchema).max(50);

export type UpdateNotificationBellBodyDto = z.infer<typeof UpdateNotificationBellBodySchema>;
export type UpdateManyNotificationBellBodyDto = z.infer<typeof UpdateManyNotificationBellBodySchema>;
