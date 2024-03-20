import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransferMethodDestinationBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
}).or(
  z.object({
    pixKey: z.string(),
  }),
);

export const CreateTransferBodySchema = z.object({
  method: z.nativeEnum(TransferMethod),
  methodDestination: CreateTransferMethodDestinationBodySchema,
  amount: z.number().int().positive(),
  metadata: z.record(z.unknown()).optional(),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
