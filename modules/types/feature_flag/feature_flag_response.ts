import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const FeatureFlagResponseSchema = z.object({
  flag: z.string(),
  enabled: z.boolean(),
  description: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export type FeatureFlagResponseDto = z.infer<typeof FeatureFlagResponseSchema>;
