import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const RegistrationProviderDataSchema = z.object({
  onboardingUrl: z.string().optional(),
});

export const RegistrationMerchantDataSchema = z.object({
  url: z.string(),
  personName: z.string(),
  personEmail: z.string(),
  companyName: z.string().optional(),
  tradingName: z.string(),
  cnae: z.string().optional(),
  monthlyBilling: z.number(),
  phoneNumber: z.string(),
  billing: z.object({
    email: z.string(),
    address: z.object({
      zipCode: z.string(),
      line1: z.string(),
      line2: z.string().optional(),
      neighborhood: z.string(),
      number: z.string(),
    }),
  }),
}).openapi({ title: 'Merchant data' }).or(z.object({}).openapi({ title: 'Empty' }));

export const RegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid().openapi({ example: 'mbWVijmG5JTUSi4PQZVKv' }),
  documentNumber: z.string().openapi({ description: 'cpf or cnpj number without punctuation', example: '88550339997' }),
  documentType: z.enum(DocumentType).openapi({ description: 'cpf or cnpj', example: DocumentType.CPF }),
  status: z.enum(RegistrationStatus).openapi({ example: RegistrationStatus.PENDING }),
  statusMessage: z.string().openapi({ example: 'status message' }),
  externalUserId: z.string(),
  assigneeId: z.string().nullable().optional().openapi({ example: 'EngmKkhbAo' }),
  providerData: RegistrationProviderDataSchema.openapi({
    example: {
      onboardingUrl: 'https://example.com',
    },
  }),
  merchantData: RegistrationMerchantDataSchema.openapi({
    example: {
      url: 'https://www.example.com',
      personName: 'João da Silva',
      personEmail: 'joao@example.com',
      companyName: 'Empresa Exemplo',
      tradingName: 'Empresa Exemplo LTDA',
      cnae: '7372',
      monthlyBilling: 100000,
      phoneNumber: '+5511999999999',
      billing: {
        email: 'billing@example.com',
        address: { zipCode: '04538132', line1: 'Av. Brigadeiro Faria Lima', line2: '4440', neighborhood: 'Itaim Bibi', number: '4440' },
      },
    },
  }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00Z' }),
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
export type RegistrationProviderData = z.infer<typeof RegistrationProviderDataSchema>;
export type RegistrationMerchantData = z.infer<typeof RegistrationMerchantDataSchema>;
