import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { RecordEntity, RecordRequestType } from '../../../modules/types/record/types.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const BaseCreateRecordBodySchema = z.object({
  entity: z.enum(RecordEntity).openapi({ example: RecordEntity.MERCHANT }),
  entityId: z.string().openapi({ example: 'b45c82cb74f5466da1ecb' }),
});

export const CreateRecordBodySchema = BaseCreateRecordBodySchema.and(z.object({
  request: z.enum(RecordRequestType).openapi({ example: RecordRequestType.TIER_UPGRADE }),
}));

export const RestrictCreateRecordBodySchema = BaseCreateRecordBodySchema.and(z.object({
  title: z.string().openapi({ example: 'title' }),
  merchantId: ZodSchemas.nanoid().optional().openapi({ example: 'b45c82cb74f5466da1ecb' }),
  comment: z.string().optional().openapi({ example: 'comment' }),
  attachments: z.array(z.instanceof(File)).or(z.instanceof(File)).transform((obj) => Array.isArray(obj) ? obj : [obj]).default(() => []).openapi({
    description: 'list containing file or blob instances',
    example: [],
    type: 'string',
    format: 'binary',
  }),
}));

export type CreateRecordBodyDto = z.infer<typeof CreateRecordBodySchema>;
export type RestrictCreateRecordBodyDto = z.infer<typeof RestrictCreateRecordBodySchema>;
