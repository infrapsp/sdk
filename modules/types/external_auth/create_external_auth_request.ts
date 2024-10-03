import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { MerchantRole } from '../../../modules/types/auth/types.ts';

export const CreateExternalAuthBodySchema = z.object({
  merchantId: ZodSchemas.nanoid(),
  email: z.string().email(),
  overrideRole: z.nativeEnum(MerchantRole),
});

export type CreateExternalAuthBodyDto = z.infer<typeof CreateExternalAuthBodySchema>;
