import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';

export const CreateAddressBodySchema = z.object({
  line1: z.string().max(200).openapi({ description: 'street or avenue', example: 'Avenida Brigadeiro Faria Lima' }),
  line2: z.string().max(100).optional().openapi({
    description: 'complement and some reference to the address',
    example: 'Edificio Faria Lima 4440, 10 andar',
  }),
  number: z.string().max(20).openapi({ example: '4440' }),
  neighborhood: z.string().max(100).openapi({ example: 'Vila Olímpia' }),
  zipCode: ZodSchemas.numeric().max(15).openapi({ example: '04538-133' }),
  state: z.string().max(60).openapi({ example: 'SP' }),
  city: z.string().max(60).openapi({ example: 'São Paulo' }),
  country: z.string().max(100).openapi({ example: 'Brasil' }),
  ibgeCode: ZodSchemas.numeric().max(10).optional().openapi({ example: '3550308' }),
});

export type CreateAddressBodyDto = z.infer<typeof CreateAddressBodySchema>;
