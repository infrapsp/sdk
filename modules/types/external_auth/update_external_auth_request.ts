import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';
import { BaseParamsSchema } from '../../../modules/types/base/requests.ts';

export const UpdateExternalAuthBodySchema = z.object({
  overrideRole: z.enum(MerchantRole).optional().openapi({ example: MerchantRole.MERCHANT_GUEST }),
  additionalScopes: z.array(ZodSchemas.authScope()).max(50).optional().openapi({
    description: 'replaces the scopes added to the ones granted by the role, in the format feature:(read|write|all)',
    example: ['transaction:read', 'transfer:write'],
  }),
});

export const UpdateExternalAuthParamsSchema = BaseParamsSchema;

export type UpdateExternalAuthBodyDto = z.infer<typeof UpdateExternalAuthBodySchema>;
