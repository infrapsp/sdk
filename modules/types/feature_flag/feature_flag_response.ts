import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const FeatureFlagResponseSchema = z.object({
  flag: z.string().openapi({ description: 'identifier of the feature flag', example: 'new_checkout' }),
  enabled: z.boolean().openapi({ description: 'whether the flag is enabled', example: true }),
  description: z.string().nullable().openapi({ example: 'enables the new checkout experience' }),
  updatedBy: z.string().nullable().openapi({ example: 'user@email.com' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export type FeatureFlagResponseDto = z.infer<typeof FeatureFlagResponseSchema>;
