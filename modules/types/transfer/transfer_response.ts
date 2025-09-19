import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { TransferMethod, TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';

export const TransferPixMethodDestinationResponseSchema = z.object({
  pixKey: z.string(),
  name: z.string().optional().nullable(),
  bank: z.string().optional().nullable(),
  ispb: z.string().optional().nullable(),
  documentNumber: z.string().optional().nullable(),
  accountType: z.string().optional().nullable(),
  documentType: z.enum(DocumentType).optional().nullable(),
});

export const TransferMethodDestinationResponseSchema = TransferPixMethodDestinationResponseSchema.or(
  z.object({}),
);

export const TransferStatusResponseSchema = z.object({
  status: z.enum(TransferStatus),
  message: z.string(),
  createdAt: z.date(),
});

export const TransferResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  method: z.enum(TransferMethod),
  methodDestination: TransferMethodDestinationResponseSchema,
  isAutoTransfer: z.boolean(),
  amount: z.number().positive().int(),
  status: z.enum(TransferStatus),
  statusMessage: z.string(),
  statusHistory: z.array(TransferStatusResponseSchema),
  metadata: z.record(z.string(), z.string().or(z.number())),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransferResponseDto = z.infer<typeof TransferResponseSchema>;
