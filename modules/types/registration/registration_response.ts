import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const RegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.enum(DocumentType),
  status: z.enum(RegistrationStatus),
  statusMessage: z.string(),
  providerData: z.object({
    companyName: z.string().optional(),
    personName: z.string().optional(),
    onboardingUrl: z.string(),
    tradingName: z.string().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
