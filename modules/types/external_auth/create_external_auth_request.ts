import { z } from 'npm:@hono/zod-openapi@0.18.3';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const CreateExternalAuthBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  email: z.string().email(),
  overrideRole: z.nativeEnum(MerchantRole),
});

export type CreateExternalAuthBodyDto = z.infer<typeof CreateExternalAuthBodySchema>;
