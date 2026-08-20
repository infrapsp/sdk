import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { InterTransferDecision } from '../../../modules/types/inter_transfer/types.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const UpdateInterTransferBodySchema = z.object({
  decision: z.enum(InterTransferDecision),
  assignee: z.string().min(1).max(128),
});

export const UpdateInterTransferParamsSchema = BaseParamsSchema;

export type UpdateInterTransferBodyDto = z.infer<typeof UpdateInterTransferBodySchema>;
