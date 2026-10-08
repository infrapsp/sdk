import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodRefines, ZodSchemas } from '../../../modules/types/zod.ts';
import { PayableEntity, PayableStatus } from '../../../modules/types/payable/types.ts';

export const FindPayableSummaryQuerySchema = z.object({
  transactionIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional().openapi({
    description: 'comma-separated list of related transactions to be considered',
    example: ['69sy4nw5PbM0PSF5e4JFZ,fce9wlRxddlakTPc2ZL1B'],
  }),
  transferIds: ZodSchemas.stringArray(ZodSchemas.nanoid()).optional().openapi({
    description: 'comma-separated list of related transfers to be considered',
    example: ['69sy4nw5PbM0PSF5e4JFZ,fce9wlRxddlakTPc2ZL1B'],
  }),
  status: ZodSchemas.stringArray(z.enum(PayableStatus)).optional().openapi({
    description: 'comma-separated list of payable status',
    example: [PayableStatus.PAID],
  }),
  entity: ZodSchemas.stringArray(z.enum(PayableEntity)).optional(),
  notStatus: ZodSchemas.stringArray(z.enum(PayableStatus)).optional(),
  notEntity: ZodSchemas.stringArray(z.enum(PayableEntity)).optional(),
  paymentDateLte: ZodSchemas.datetime().optional().openapi({
    description: 'payment date less than or equal to',
    example: '2021-09-01T00:00:00.000Z',
  }),
  paymentDateGte: ZodSchemas.datetime().optional().openapi({
    description: 'payment date greater than or equal to',
    example: '2021-09-01T00:00:00.000Z',
  }),
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
