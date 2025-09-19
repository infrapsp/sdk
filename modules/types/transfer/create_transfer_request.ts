import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string(), z.string().or(z.number())).optional(),
  method: z.enum(TransferMethod),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
