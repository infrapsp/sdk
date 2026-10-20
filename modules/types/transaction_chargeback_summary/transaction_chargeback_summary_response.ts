import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import {
  TransactionChargebackReason,
  TransactionChargebackRequiredDocument,
  TransactionChargebackStatus,
} from '../../../modules/types/transaction_chargeback/types.ts';
import { RelatedTransactionChargebackResponseSchema } from '../../../modules/types/transaction_chargeback/transaction_chargeback_response.ts';

export const TransactionChargebackSummaryResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ description: 'Same as transaction id', example: 'gnQjJatJSrhxaGtXeTuDd' }),
  parentId: ZodSchemas.nanoid().openapi({ example: 'KaEVV7UOJOzB2QH2zPrkz' }),
  activeChargebackId: ZodSchemas.nanoid().openapi({
    description: 'ID of the chargeback driving the dispute',
    example: 'KaEVV7UOJOzB2QH2zPrkz',
  }),
  status: z.enum(TransactionChargebackStatus).openapi({
    description: 'summary status, combined from all related chargebacks',
    example: TransactionChargebackStatus.WAITING_RESPONSE,
  }),
  amount: z.number().openapi({ description: 'Total amount of all related chargebacks in cents', example: 10000 }),
  wonAmount: z.number().openapi({ description: 'Total amount of all related chargebacks won in cents', example: 0 }),
  holdAmount: z.number().openapi({ description: 'Total amount of all related chargebacks on hold in cents', example: 10000 }),
  reason: z.enum(TransactionChargebackReason).openapi({ description: 'Reason of the chargeback', example: TransactionChargebackReason.FRAUD }),
  isGuaranteePaid: z.boolean().openapi({ description: 'Indicate if chargeback guarantee has been paid', example: false }),
  maximumAttendanceDate: ZodSchemas.elasticDate().openapi({
    description: 'Deadline to submit documents to dispute the chargeback',
    example: '2021-11-25T20:00:00.000Z',
  }),
  requiredDocuments: z.array(z.enum(TransactionChargebackRequiredDocument)).openapi({
    description: 'List of required documents to start a dispute',
    example: [TransactionChargebackRequiredDocument.TRANSACTION_RECEIPT],
  }),
  documentUrl: z.string().nullable().openapi({
    description: 'URL to view/download the documents uploaded',
    example: 'https://example.com/document.pdf',
  }),
  providerData: z.record(z.string(), z.unknown()).openapi({
    description: 'Provider-specific data of the active chargeback',
    example: { chargebackReason: 'Compra aprovada sem autorização do portador' },
  }),
  relatedChargebacks: z.array(RelatedTransactionChargebackResponseSchema.extend({
    maximumAttendanceDate: ZodSchemas.elasticDate(),
    createdAt: ZodSchemas.elasticDate(),
    updatedAt: ZodSchemas.elasticDate(),
  })).openapi({ description: 'Parent and children chargebacks of the transaction' }),
  createdAt: ZodSchemas.elasticDate().openapi({ description: 'Creation date of the parent chargeback', example: '2021-10-25T20:00:00.000Z' }),
  updatedAt: ZodSchemas.elasticDate().openapi({
    description: 'Latest update among the parent and its children',
    example: '2021-10-25T20:00:00.000Z',
  }),
});

export type TransactionChargebackSummaryResponseDto = z.infer<typeof TransactionChargebackSummaryResponseSchema>;
