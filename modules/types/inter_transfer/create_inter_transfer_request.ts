import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

export const CreateInterTransferBodySchema = z.object({
  sourceMerchantId: ZodSchemas.nanoid(),
  targetMerchantId: ZodSchemas.nanoid(),
  account: z.enum(BalanceAccountType),
  author: z.string().min(1).max(128),
  description: z.string().max(320),
});

export type CreateInterTransferBodyDto = z.infer<typeof CreateInterTransferBodySchema>;
