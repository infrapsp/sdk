import { BaseParamsSchema, BaseQuerySchema } from '../../../modules/types/base/requests.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { SortOrder } from '../../../modules/types/base/types.ts';
import { AmlEntity, AnalysisRiskLevel, AnalysisStatus } from '../../../modules/types/aml/types.ts';

export const FindAnalysisParamsSchema = BaseParamsSchema;

export const FindAnalysisQuerySchema = BaseQuerySchema.and(
  z.object({
    entity: ZodSchemas.stringArray(z.enum(AmlEntity)).optional(),
    entityId: ZodSchemas.nanoid().optional(),
    merchantId: ZodSchemas.nanoid().optional(),
    status: ZodSchemas.stringArray(z.enum(AnalysisStatus)).optional(),
    notStatus: ZodSchemas.stringArray(z.enum(AnalysisStatus)).optional(),
    riskLevel: ZodSchemas.stringArray(z.enum(AnalysisRiskLevel)).optional(),
    notRiskLevel: ZodSchemas.stringArray(z.enum(AnalysisRiskLevel)).optional(),
    notEntity: ZodSchemas.stringArray(z.enum(AmlEntity)).optional(),
    isNotified: z.coerce.boolean().optional(),
    assigneeId: z.string().optional(),
    scoreGte: z.coerce.number().min(0).optional(),
    scoreLte: z.coerce.number().min(0).optional(),
    sortField: z.enum(['createdAt', 'paymentDate']).default('createdAt'),
    sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
  }),
);

export type FindAnalysisParamsDto = z.infer<typeof FindAnalysisParamsSchema>;
export type FindAnalysisQueryDto = z.infer<typeof FindAnalysisQuerySchema>;
