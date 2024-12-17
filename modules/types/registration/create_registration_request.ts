import { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { ZodSchemas } from '../../../modules/types/zod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { ZodRefines } from '../../../modules/types/zod.ts';

export const CreateRegistrationBodySchema = z.object({
  documentNumber: ZodSchemas.document(),
  documentType: z.nativeEnum(DocumentType),
  segmentId: ZodSchemas.nanoid(),
}).transform((dto, ctx) => {
  ZodRefines.matchDocument(ctx, dto.documentNumber, dto.documentType);
  return dto;
});

export type CreateRegistrationBodyDto = z.infer<typeof CreateRegistrationBodySchema>;
