import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { AmlEntity, AnalysisRiskLevel, AnalysisStatus } from '../../../modules/types/aml/types.ts';

export const RuleEvalReponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  ruleId: ZodSchemas.nanoid(),
  query: z.string(),
  score: z.number().min(0),
  hit: z.boolean(),
  result: z.record(z.string(), z.unknown()),
  params: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AnalysisResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  merchantId: ZodSchemas.nanoid(),
  status: z.enum(AnalysisStatus),
  entity: z.enum(AmlEntity),
  entityId: ZodSchemas.nanoid(),
  requiresReview: z.boolean(),
  riskLevel: z.enum(AnalysisRiskLevel),
  payload: z.record(z.string(), z.unknown()),
  score: z.number().min(0),
  isNotified: z.boolean(),
  assigneeId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  evals: z.array(RuleEvalReponseSchema),
});

export type AnalysisResponseDto = z.infer<typeof AnalysisResponseSchema>;
