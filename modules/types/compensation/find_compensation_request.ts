import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';

const MAX_RANGE_MS = 1000 * 60 * 60 * 24 * 45; // 45 days

export const FindCompensationQuerySchema = z.object({
  payablePaymentDateGte: ZodSchemas.datetime().optional(),
  payablePaymentDateLte: ZodSchemas.datetime().optional(),
  urPaymentDateGte: ZodSchemas.datetime().optional(),
  urPaymentDateLte: ZodSchemas.datetime().optional(),
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
