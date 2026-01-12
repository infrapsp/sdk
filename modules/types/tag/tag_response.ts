import { z } from 'npm:@hono/zod-openapi@1.1.0';

export const TagResponseSchema = z.object({
  tag: z.string().max(32),
  description: z.string().max(255),
  color: z.string().max(7),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TagResponseDto = z.infer<typeof TagResponseSchema>;
