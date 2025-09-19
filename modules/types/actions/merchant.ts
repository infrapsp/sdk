import { z } from 'hono/zod-openapi';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';
import { RegistrationStatus } from '$modules/types/registration/types.ts';

export enum MerchantAction {
  PROCESS_REGISTRATION = 'process-registration',
}

export const ProcessRegistrationBodySchema = z.object({
  action: z.literal(MerchantAction.PROCESS_REGISTRATION),
  payload: z.object({
    merchant: z.object({
      url: z.string(),
      personName: z.string(),
      personEmail: z.email(),
      companyName: z.string().optional(),
      tradingName: z.string(),
      cnae: z.string().optional(),
      monthlyBilling: z.number().optional(),
    }),
    billing: z.object({
      email: z.string(),
      address: z.object({
        zipCode: z.string(),
        line1: z.string(),
        line2: z.string().optional(),
        neighborhood: z.string(),
        number: z.string(),
      }),
    }).optional(),
    attempt: z.number().int().min(1),
    status: z.enum(RegistrationStatus),
  }),
});

// Worker
export const ProcessRegistrationWorkerBodySchema = BaseWorkerBodySchema.and(ProcessRegistrationBodySchema);

export type ProcessRegistrationWorkerBodyDto = z.infer<typeof ProcessRegistrationWorkerBodySchema>;
