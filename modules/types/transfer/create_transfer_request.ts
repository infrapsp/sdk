import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
  method: z.nativeEnum(TransferMethod),
}).transform((dto, ctx) => {
  if (dto.method === TransferMethod.INTER) {
    ZodHelpers.issue(ctx, 'method', 'invalid value for method');
  }

  return dto;
});

export const CreateInterTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
  merchantId: ZodSchemas.nanoid(),
  tenantId: ZodSchemas.nanoid(),
  methodDestination: z.object({
    merchantId: ZodSchemas.nanoid(),
  }),
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
export type CreateInterTransferBodyDto = z.infer<typeof CreateInterTransferBodySchema>;
