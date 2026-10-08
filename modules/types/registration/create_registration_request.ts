import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { ZodRefines } from '../../../modules/types/zod.ts';

export const CreateRegistrationBodySchema = z.object({
  documentNumber: ZodSchemas.document().openapi({ description: 'cpf or cnpj number without punctuation', example: '88550339997', type: 'string' }),
  documentType: z.enum(DocumentType).openapi({ description: 'cpf or cnpj', example: DocumentType.CPF }),
  variables: z.record(z.string(), z.string()).optional().openapi({
    description: 'variables to be used in the onboarding template',
    example: {
      redirectTo: 'https://example.com/redirect',
    },
  }),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  return dto;
});

export type CreateRegistrationBodyDto = z.infer<typeof CreateRegistrationBodySchema>;
