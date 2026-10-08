import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive().openapi({ example: 1000 }),
  metadata: z.record(z.string(), z.string().or(z.number())).optional().openapi({
    example: { key: 'value' },
    description: 'open field to store information',
  }),
  method: z.enum(TransferMethod).openapi({ example: TransferMethod.PIX }),
  account: z.enum([BalanceAccountType.TENANT]),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
