import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const ReplyExternalAuthInviteBodySchema = z.object({
  hasAccepted: z.boolean(),
});

export const ReplyExternalAuthInviteParamsSchema = BaseParamsSchema;

export type ReplyExternalAuthInviteBodyDto = z.infer<typeof ReplyExternalAuthInviteBodySchema>;
