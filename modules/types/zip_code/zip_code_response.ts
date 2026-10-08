import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const ZipCodeResponse = z.object({
  line1: z.string().optional().nullable().openapi({ example: 'Rua Amador Bueno' }),
  line2: z.string().optional().nullable().openapi({ example: '181' }),
  state: z.string().openapi({ example: 'SP' }),
  city: z.string().openapi({ example: 'Santos' }),
  ibgeCode: z.string().openapi({ example: '3548500' }),
  neighborhood: z.string().optional().nullable().openapi({ example: 'Centro' }),
  name: z.string().optional().nullable().openapi({ example: 'Edifício Gomes' }),
  zipCode: z.string().openapi({ example: '11013912' }),
});

export type ZipCodeResponseDto = z.infer<typeof ZipCodeResponse>;
