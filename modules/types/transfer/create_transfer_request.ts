import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'npm:@hono/zod-openapi@0.18.3';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
  method: z.nativeEnum(TransferMethod),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
