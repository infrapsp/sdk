import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionChargebackReason,
  TransactionChargebackRequiredDocument,
  TransactionChargebackStatus,
} from '../../../modules/types/transaction_chargeback/types.ts';

export const TransactionChargebackStatusHistoryResponseSchema = z.object({
  status: z.enum(TransactionChargebackStatus).openapi({ description: 'Chargeback status', example: TransactionChargebackStatus.PENDING }),
  message: z.string().openapi({ description: 'Status message', example: 'Chargeback created and pending review' }),
  createdAt: z.date().openapi({ description: 'Status creation date', example: '2021-10-25T20:00:00.000Z' }),
});

export const RelatedTransactionChargebackResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  parentId: ZodSchemas.nanoid().nullable(),
  amount: z.number(),
  wonAmount: z.number(),
  holdAmount: z.number(),
  status: z.enum(TransactionChargebackStatus),
  reason: z.enum(TransactionChargebackReason),
  isGuaranteePaid: z.boolean(),
  maximumAttendanceDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TransactionChargebackResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'gnQjJatJSrhxaGtXeTuDd' }),
  transactionId: ZodSchemas.nanoid().openapi({ example: 'gnQjJatJSrhxaGtXeTuDd' }),
  parentId: ZodSchemas.nanoid().nullable().openapi({ description: 'ID of the original chargeback; null when it is the parent', example: null }),
  amount: z.number().openapi({ description: 'Chargeback amount in cents', example: 10000 }),
  wonAmount: z.number().openapi({ description: 'Amount won in the chargeback in cents', example: 8000 }),
  holdAmount: z.number(),
  status: z.enum(TransactionChargebackStatus).openapi({ description: 'Chargeback status', example: TransactionChargebackStatus.PENDING }),
  statusMessage: z.string().openapi({ description: 'Chargeback status message', example: 'Chargeback is pending review' }),
  statusHistory: z.array(TransactionChargebackStatusHistoryResponseSchema).openapi({ description: 'History of status changes for the chargeback' }),
  reason: z.enum(TransactionChargebackReason).openapi({ description: 'Reason for the chargeback', example: TransactionChargebackReason.FRAUD }),
  requiredDocuments: z.array(z.enum(TransactionChargebackRequiredDocument)).openapi({
    description: 'List of required documents to start a dispute of the chargeback',
    example: [TransactionChargebackRequiredDocument.TRANSACTION_RECEIPT],
  }),
  documentUrl: z.string().optional().nullable().openapi({
    description: 'URL to view/download the documents uploaded for the chargeback',
    example: 'https://example.com/document.pdf',
  }),
  providerData: z.record(z.string(), z.unknown()).openapi({
    description: 'Provider-specific data related to the chargeback',
    example: { chargebackReason: 'Compra aprovada sem autorização do portador' },
  }),
  maximumAttendanceDate: z.date(),
  isGuaranteePaid: z.boolean().openapi({ description: 'Indicates if the chargeback guarantee has been paid', example: false }),
  createdAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2021-10-25T20:00:00.000Z' }),
  relatedChargebacks: z.array(RelatedTransactionChargebackResponseSchema).optional(),
});

export type TransactionChargebackResponseDto = z.infer<typeof TransactionChargebackResponseSchema>;
