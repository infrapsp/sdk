import { z } from 'hono/zod-openapi';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';

export enum NotificationAction {
  SEND_BELL_NOTIFICATION = 'send-bell-notification',
  SEND_EMAIL_NOTIFICATION = 'send-email-notification',
}

export const SendBellNotificationBodySchema = z.object({
  action: z.literal(NotificationAction.SEND_BELL_NOTIFICATION),
  payload: z.object({}),
});

export const SendEmailNotificationBodySchema = z.object({
  action: z.literal(NotificationAction.SEND_EMAIL_NOTIFICATION),
  payload: z.object({}),
});

// Worker
export const SendBellNotificationWorkerBodySchema = BaseWorkerBodySchema.and(SendBellNotificationBodySchema);
export const SendEmailNotificationWorkerBodySchema = BaseWorkerBodySchema.and(SendEmailNotificationBodySchema);
