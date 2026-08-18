import { ZodSchemas } from '../../../modules/types/zod.ts';
import { z } from 'npm:@hono/zod-openapi@1.4.0';
import { DocumentType } from '../../../modules/types/merchant/types.ts';
import { RegistrationStatus } from '../../../modules/types/registration/types.ts';

export const RegistrationProviderDataSchema = z.object({
  onboardingUrl: z.string().optional(),
  tradingName: z.string().optional(),
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
}).or(z.object({}));

export const RegistrationResponseSchema = z.object({
  id: ZodSchemas.nanoid(),
  documentNumber: z.string(),
  documentType: z.enum(DocumentType),
  status: z.enum(RegistrationStatus),
  statusMessage: z.string(),
  externalUserId: z.string(),
  providerData: RegistrationProviderDataSchema,
  merchantData: RegistrationMerchantDataSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RegistrationResponseDto = z.infer<typeof RegistrationResponseSchema>;
export type RegistrationProviderData = z.infer<typeof RegistrationProviderDataSchema>;
export type RegistrationMerchantData = z.infer<typeof RegistrationMerchantDataSchema>;
