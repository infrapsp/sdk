import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const CreateExternalAuthBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  email: z.email(),
  overrideRole: z.enum(MerchantRole),
});

export type CreateExternalAuthBodyDto = z.infer<typeof CreateExternalAuthBodySchema>;
