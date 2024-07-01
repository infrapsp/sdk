import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { TransferMethod, TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TransferPixMethodDestinationResponseSchema = z.object({
  pixKey: z.string(),
});

export const TransferInterMethodDestinationResponseSchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const TransferMethodDestinationResponseSchema = TransferPixMethodDestinationResponseSchema.or(TransferInterMethodDestinationResponseSchema).or(
  z.object({}),
);

export const TransferStatusResponseSchema = z.object({
  status: z.nativeEnum(TransferStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransferResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  method: z.nativeEnum(TransferMethod),
  methodDestination: TransferMethodDestinationResponseSchema,
  isAutoTransfer: z.boolean(),
  amount: z.number().positive().int(),
  status: z.nativeEnum(TransferStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransferStatusResponseSchema),
  metadata: z.record(z.string().or(z.number())),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransferResponseDto = z.infer<typeof TransferResponseSchema>;
