import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const DeleteMerchantRecordParamsSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
});
