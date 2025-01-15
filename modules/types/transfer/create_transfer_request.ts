import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
  method: z.nativeEnum(TransferMethod),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
