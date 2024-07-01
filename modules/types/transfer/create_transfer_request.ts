import { TransferMethod } from '../../../modules/types/transfer/types.ts';
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateTransferPixMethodDestinationBodySchema = z.object({
  pixKey: z.string(),
});

export const CreateTransferInterMethodDestinationBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
});

export const CreateTransferMethodDestinationBodySchema = CreateTransferPixMethodDestinationBodySchema.or(
  CreateTransferInterMethodDestinationBodySchema,
);

export const CreateTransferBodySchema = z.object({
  amount: z.number().int().positive(),
  metadata: z.record(z.string().or(z.number())).optional(),
});

export const CreateTransferRestrictedBodySchema = z.object({
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  methodDestination: CreateTransferMethodDestinationBodySchema.optional(),
  isAutoTransfer: z.boolean().optional().default(false),
  amount: z.number().int().positive(),
  method: z.nativeEnum(TransferMethod),
  metadata: z.record(z.string().or(z.number())).optional(),
}).transform((dto, ctx) => {
  if (dto.method === TransferMethod.INTER && !(dto.methodDestination as { merchantId: string })?.merchantId) {
    ZodHelpers.issue(ctx, 'methodDestination', 'Should inform merchantId for inter transfers');
  }

  return dto;
});

export type CreateTransferBodyDto = z.infer<typeof CreateTransferBodySchema>;
export type CreateTransferRestrictedBodyDto = z.infer<typeof CreateTransferRestrictedBodySchema>;
