import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { ZodRefines } from '../../../modules/types/zod.ts';

export const CreateRegistrationBodySchema = z.object({
  documentNumber: ZodSchemas.document(),
  documentType: z.enum(DocumentType),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  return dto;
});

export type CreateRegistrationBodyDto = z.infer<typeof CreateRegistrationBodySchema>;
