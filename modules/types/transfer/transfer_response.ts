import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { TransferMethod, TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TransferResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  method: z.nativeEnum(TransferMethod),
  methodDestination: z.record(z.unknown()),
  amount: z.number().positive().int(),
  status: z.nativeEnum(TransferStatus),
  statusMessage: z.string(),
  metadata: z.record(z.string().or(z.number())),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransferResponseDto = z.infer<typeof TransferResponseSchema>;
