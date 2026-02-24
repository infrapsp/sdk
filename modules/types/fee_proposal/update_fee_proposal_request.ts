import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { FeeProposalStatus } from '../../../modules/types/fee_proposal/types.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const UpdateFeeProposalBodySchema = z.object({
  status: z.enum(FeeProposalStatus),
});

export const UpdateFeeProposalParamsSchema = BaseParamsSchema;

export type UpdateFeeProposalBodyDto = z.infer<typeof UpdateFeeProposalBodySchema>;
