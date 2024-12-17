import { ZodSchemas } from '../../../modules/types/zod.ts';
import z from 'https://deno.land/x/zod@v3.24.1/mod.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const RegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.nativeEnum(DocumentType),
  status: z.nativeEnum(RegistrationStatus).optional(),
  providerData: z.object({
    onboardingUrl: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
