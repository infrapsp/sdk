import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodHelpers } from '../../../modules/types/zod.ts';

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
  method: z.nativeEnum(TransferMethod),
}).transform((dto, ctx) => {
  // if (dto.method === TransferMethod.INTER && !(dto.methodDestination as { merchantId: string })?.merchantId) {
  //   ZodHelpers.issue(ctx, 'methodDestination', 'Should inform merchantId for inter transfers');
  // }

  if (dto.method === TransferMethod.INTER) {
    ZodHelpers.issue(ctx, 'method', 'invalid value for method');
  }

  return dto;
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
