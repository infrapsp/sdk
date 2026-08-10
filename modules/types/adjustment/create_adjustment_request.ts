import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AdjustmentStatus } from '../../../modules/types/adjustment/types.ts';
import { BalanceAccountType } from '../../../modules/types/balance/types.ts';

const CreateUnitReceivableAdjustmentBodySchema = z.object({
  unitReceivableId: ZodSchemas.nanoid(),
  description: z.string().max(320),
});

const CreateTenantAdjustmentBodySchema = z.object({
  tenantId: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  account: z.literal(BalanceAccountType.TENANT),
  status: z.literal(AdjustmentStatus.APPROVED),
  amount: z.number(),
  description: z.string().max(320),
});

export const CreateAdjustmentBodySchema = CreateUnitReceivableAdjustmentBodySchema.or(CreateTenantAdjustmentBodySchema);

export type CreateAdjustmentBodyDto = z.infer<typeof CreateAdjustmentBodySchema>;
