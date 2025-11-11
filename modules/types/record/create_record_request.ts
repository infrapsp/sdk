import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { RecordEntity, RecordRequestType } from '../../../modules/types/record/types.ts';

const BaseCreateRecordBodySchema = z.object({
  entity: z.enum(RecordEntity),
  entityId: z.string(),
});

export const CreateRecordBodySchema = BaseCreateRecordBodySchema.and(z.object({
  request: z.enum(RecordRequestType),
}));

export const RestrictCreateRecordBodySchema = BaseCreateRecordBodySchema.and(z.object({
  title: z.string(),
  merchantId: z.string(),
  comment: z.string().optional(),
  attachments: z.array(z.instanceof(File)).or(z.instanceof(File)).transform((obj) => Array.isArray(obj) ? obj : [obj]).default(() => []),
}));

export type CreateRecordBodyDto = z.infer<typeof CreateRecordBodySchema>;
export type RestrictCreateRecordBodyDto = z.infer<typeof RestrictCreateRecordBodySchema>;
