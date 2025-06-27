import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@0.19.8';
import { TransferStatus } from '../../../modules/types/transfer/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';

export const FindTransferQuerySchema = BaseQuerySchema.and(
  z.object({
    status: ZodSchemas.stringArray(z.nativeEnum(TransferStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.nativeEnum(TransferStatus)).optional(),
    isAutoTransfer: ZodSchemas.booleanString().optional(),
    search: z.string().max(128).optional(),
    sortField: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  }),
);

export const FindTransferParamsSchema = z.object({}).and(BaseParamsSchema);

export type FindTransferQueryDto = z.infer<typeof FindTransferQuerySchema>;
