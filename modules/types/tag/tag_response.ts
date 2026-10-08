import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const TagResponseSchema = z.object({
  tag: z.string().max(32).openapi({ example: 'high-risk' }),
  description: z.string().max(255).openapi({ example: 'Merchants with suspicious actions or behaviors' }),
  color: z.string().max(7).openapi({ example: '#FF0000' }),
  createdAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2024-01-01T00:00:00Z' }),
});

export type TagResponseDto = z.infer<typeof TagResponseSchema>;
