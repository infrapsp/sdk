import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { OperationStatus, OriginEntity, OriginMethod } from '../../../modules/types/operation/types.ts';

export const OperationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  payableId: ZodSchemas.nanoid(),
  status: z.enum(OperationStatus),
  amount: z.number().int(),
  paymentDate: z.date(),
  entity: z.enum(OriginEntity),
  method: z.enum(OriginMethod),
  description: z.string(),
  createdAt: z.date(),
});

export type OperationResponseDto = z.infer<typeof OperationResponseSchema>;
