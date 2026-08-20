import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { InterTransferStatus } from '../../../modules/types/inter_transfer/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const InterTransferResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  sourceMerchantId: ZodSchemas.nanoid(),
  targetMerchantId: ZodSchemas.nanoid(),
  account: z.enum(BalanceAccountType),
  status: z.enum(InterTransferStatus),
  amount: z.number().nullable(),
  author: z.string(),
  assignee: z.string().nullable(),
  description: z.string().max(320),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type InterTransferResponseDto = z.infer<typeof InterTransferResponseSchema>;
