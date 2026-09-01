import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const BankResponseSchema = z.object({
  ispb: z.string().length(8),
  name: z.string(),
  slcParticipant: z.boolean(),
  settlementIspb: z.string().length(8).nullable(),
});

export type BankResponseDto = z.infer<typeof BankResponseSchema>;
