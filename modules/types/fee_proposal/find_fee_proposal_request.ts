import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const FindFeeProposalQuerySchema = z.object({
  merchantId: ZodSchemas.nanoid().optional().openapi({
    example: 'upNWAg3eC8apERUqJx6yp',
    description: 'filter by merchant ID (only available for admins)',
  }),
});
