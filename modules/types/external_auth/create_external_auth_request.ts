import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const CreateExternalAuthBodySchema = z.object({
  merchantId: ZodSchemas.nanoid().openapi({ example: 'zpBxynBgNCzbdOKmpKG1k' }),
  email: z.email().openapi({ example: 'merchant@email.com' }),
  overrideRole: z.enum(MerchantRole).openapi({ example: MerchantRole.MERCHANT }),
});

export type CreateExternalAuthBodyDto = z.infer<typeof CreateExternalAuthBodySchema>;
