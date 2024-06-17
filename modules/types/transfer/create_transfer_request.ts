import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransferPixMethodDestinationBodySchema = z.object({
  pixKey: z.string(),
});

export const CreateTransferInterMethodDestinationBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const CreateTransferMethodDestinationBodySchema = CreateTransferPixMethodDestinationBodySchema.or(
  CreateTransferInterMethodDestinationBodySchema,
).or(
  z.object({}),
);

export const CreateTransferBodySchema = z.object({
  method: z.nativeEnum(TransferMethod),
  methodDestination: CreateTransferMethodDestinationBodySchema,
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
