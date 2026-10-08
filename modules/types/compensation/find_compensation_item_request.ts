import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodHelpers, ZodSchemas } from '../../../modules/types/zod.ts';

export const FindCompensationItemQuerySchema = z.object({
  payablePaymentDate: ZodSchemas.dateString().optional().openapi({
    description: 'brazilian day of the compensated payable payment date, exclusive with urPaymentDate',
    example: '2021-09-01',
  }),
  urPaymentDate: ZodSchemas.dateString().optional().openapi({
    description: 'brazilian day of the debited unit receivable payment date, exclusive with payablePaymentDate',
    example: '2021-09-01',
  }),
}).transform((dto, ctx) => {
  if (Boolean(dto.payablePaymentDate) === Boolean(dto.urPaymentDate)) {
    ZodHelpers.issue(ctx, 'paymentDate', 'should inform exactly one of payablePaymentDate or urPaymentDate');
  }

  return dto;
});

export type FindCompensationItemQueryDto = z.infer<typeof FindCompensationItemQuerySchema>;
