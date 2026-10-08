import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const BankResponseSchema = z.object({
  ispb: z.string().length(8).openapi({ description: 'identifier of the institution on the brazilian payment system', example: '60746948' }),
  name: z.string().openapi({ example: 'BANCO BRADESCO S.A.' }),
  slcParticipant: z.boolean().openapi({ description: 'whether the institution participates in the SLC', example: false }),
  settlementIspb: z.string().length(8).nullable().openapi({
    description: 'identifier of the institution that settles on behalf of this one',
    example: '60746948',
  }),
});

export type BankResponseDto = z.infer<typeof BankResponseSchema>;
