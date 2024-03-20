import { BaseResponseSchema } from '../../../modules/types/base/responses.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { TransferMethod, TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const TransferResponseSchema = BaseResponseSchema.and(
  z.object({
    merchantId: ZodSchemas.nanoid(),
    tenantId: ZodSchemas.nanoid(),
    method: z.nativeEnum(TransferMethod),
    methodDestination: z.record(z.unknown()),
    amount: z.number().positive().int(),
    status: z.nativeEnum(TransferStatus),
    metadata: z.record(z.unknown()),
  }),
);

export type TransferResponseDto = z.infer<typeof TransferResponseSchema>;
