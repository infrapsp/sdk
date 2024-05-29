import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { OperationStatus, OriginEntity, OriginMethod } from '../../../modules/types/operation/types.ts';

export const OperationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  payableId: ZodSchemas.nanoid(),
  status: z.nativeEnum(OperationStatus),
  amount: z.number().int(),
  paymentDate: z.date(),
  entity: z.nativeEnum(OriginEntity),
  method: z.nativeEnum(OriginMethod),
  description: z.string(),
  createdAt: z.date(),
});

export type OperationResponseDto = z.infer<typeof OperationResponseSchema>;
