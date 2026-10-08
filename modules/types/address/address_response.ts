import { z } from 'npm:@hono/zod-openapi@1.4.0';

export const AddressResponseSchema = z.object({
  line1: z.string().openapi({ description: 'street or avenue', example: 'Avenida Brigadeiro Faria Lima' }),
  line2: z.string().optional().nullable().openapi({
    description: 'complement and some reference to the address',
    example: 'Edificio Faria Lima 4440, 10 andar',
  }),
  number: z.string().openapi({ example: '4440' }),
  neighborhood: z.string().openapi({ example: 'Vila Olímpia' }),
  zipCode: z.string().openapi({ example: '04538-133' }),
  state: z.string().openapi({ example: 'SP' }),
  city: z.string().openapi({ example: 'São Paulo' }),
  country: z.string().openapi({ example: 'Brasil' }),
  ibgeCode: z.string().optional().nullable().openapi({ example: '3550308' }),
});

export type AddressResponseDto = z.infer<typeof AddressResponseSchema>;
