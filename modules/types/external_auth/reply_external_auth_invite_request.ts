import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const ReplyExternalAuthInviteBodySchema = z.object({
  hasAccepted: z.boolean(),
});

export const ReplyExternalAuthInviteParamsSchema = BaseParamsSchema;

export type ReplyExternalAuthInviteBodyDto = z.infer<typeof ReplyExternalAuthInviteBodySchema>;
