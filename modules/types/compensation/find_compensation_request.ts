import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';

const MAX_RANGE_MS = 1000 * 60 * 60 * 24 * 45; // 45 days

export const FindCompensationQuerySchema = z.object({
  payablePaymentDateGte: ZodSchemas.datetime().optional().openapi({
    description: 'aggregate by payable payment date — greater than or equal to. Requires payablePaymentDateLte. Takes precedence over urPaymentDate.',
    example: '2026-07-01T00:00:00.000Z',
  }),
  payablePaymentDateLte: ZodSchemas.datetime().optional().openapi({
    description: 'aggregate by payable payment date — less than or equal to. Requires payablePaymentDateGte. Range must not exceed 45 days.',
    example: '2026-08-01T00:00:00.000Z',
  }),
  urPaymentDateGte: ZodSchemas.datetime().optional().openapi({
    description:
      'aggregate by unit receivable payment date — greater than or equal to. Requires urPaymentDateLte. Ignored when payablePaymentDate is informed.',
    example: '2026-07-01T00:00:00.000Z',
  }),
  urPaymentDateLte: ZodSchemas.datetime().optional().openapi({
    description: 'aggregate by unit receivable payment date — less than or equal to. Requires urPaymentDateGte. Range must not exceed 45 days.',
    example: '2026-08-01T00:00:00.000Z',
  }),
}).transform((dto, ctx) => {
  const hasPayable = Boolean(dto.payablePaymentDateGte || dto.payablePaymentDateLte);
  const hasUr = Boolean(dto.urPaymentDateGte || dto.urPaymentDateLte);

  if (!hasPayable && !hasUr) {
    ZodHelpers.issue(ctx, 'paymentDate', 'should inform payablePaymentDate or urPaymentDate range');
    return dto;
  }

  // payablePaymentDate has precedence; urPaymentDate is ignored when it is present
  if (hasPayable) {
    if (!dto.payablePaymentDateGte || !dto.payablePaymentDateLte) {
      ZodHelpers.issue(ctx, 'payablePaymentDate', 'should inform both payablePaymentDateGte and payablePaymentDateLte');
    } else {
      ZodRefines.validDateRange(ctx, dto.payablePaymentDateGte, dto.payablePaymentDateLte, MAX_RANGE_MS, 'payablePaymentDate');
    }
  } else {
    if (!dto.urPaymentDateGte || !dto.urPaymentDateLte) {
      ZodHelpers.issue(ctx, 'urPaymentDate', 'should inform both urPaymentDateGte and urPaymentDateLte');
    } else {
      ZodRefines.validDateRange(ctx, dto.urPaymentDateGte, dto.urPaymentDateLte, MAX_RANGE_MS, 'urPaymentDate');
    }
  }

  return dto;
});

export type FindCompensationQueryDto = z.infer<typeof FindCompensationQuerySchema>;
