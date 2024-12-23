import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableStatus } from '../../../modules/types/payable/types.ts';

export const FindPayableSummaryQuerySchema = z.object({
  transactionIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
  transferIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional(),
  status: ZodSchemas.stringArray(z.nativeEnum(PayableStatus)).optional(),
  paymentDateLte: ZodSchemas.datetime().optional(),
  paymentDateGte: ZodSchemas.datetime().optional(),
}).transform((dto, ctx) => {
  // paymentDate validation
  if ((dto.paymentDateGte && !dto.paymentDateLte) || (dto.paymentDateLte && !dto.paymentDateGte)) {
    ZodHelpers.issue(ctx, 'paymentDate', 'should inform both paymentDateGte and paymentDateLte');
  }

  if (dto.paymentDateGte && dto.paymentDateLte) {
    ZodRefines.validDateRange(ctx, dto.paymentDateGte, dto.paymentDateLte, 1000 * 60 * 60 * 24 * 30 * 12, 'paymentDate');
  }

  return dto;
});

export type FindPayableSummaryQueryDto = z.infer<typeof FindPayableSummaryQuerySchema>;
