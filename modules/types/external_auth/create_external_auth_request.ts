import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const CreateExternalAuthBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().openapi({ example: 'zpBxynBgNCzbdOKmpKG1k' }),
  email: z.email().openapi({ example: 'merchant@email.com' }),
  overrideRole: z.enum(MerchantRole).openapi({ example: MerchantRole.MERCHANT }),
  additionalScopes: z.array(ZodSchemas.authScope()).max(50).default([]).openapi({
    description: 'scopes added to the ones granted by the role, in the format feature:(read|write|all)',
    example: ['transaction:read', 'transfer:write'],
  }),
});

export type CreateExternalAuthBodyDto = z.infer<typeof CreateExternalAuthBodySchema>;
