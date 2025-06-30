import { z } from 'hono/zod-openapi';
import { BaseWorkerBodySchema } from '$modules/types/actions/base.ts';
import { RegistrationStatus } from '$modules/types/registration/types.ts';

export enum MerchantAction {
  PROCESS_REGISTRATION = 'process-registration',
  CREATE_MERCHANT = 'create-merchant',
}

// process updated registration
export const CreateMerchantBodySchema = z.object({
  action: z.literal(MerchantAction.CREATE_MERCHANT),
  payload: z.object({
    merchant: z.object({
      url: z.string().url(),
      personName: z.string(),
      personEmail: z.string().email(),
      companyName: z.string().optional(),
      tradingName: z.string(),
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
    }),
  }),
});

export const ProcessRegistrationBodySchema = z.object({
  action: z.literal(MerchantAction.PROCESS_REGISTRATION),
  payload: z.object({
    personName: z.string(),
    personEmail: z.string(),
    tradingName: z.string(),
    attempt: z.number().int().min(1),
    status: z.nativeEnum(RegistrationStatus),
  }),
});

// Worker
export const CreateMerchantWorkerBodySchema = BaseWorkerBodySchema.and(CreateMerchantBodySchema);
export const ProcessRegistrationWorkerBodySchema = BaseWorkerBodySchema.and(ProcessRegistrationBodySchema);

export type CreateMerchantWorkerBodyDto = z.infer<typeof CreateMerchantWorkerBodySchema>;
export type ProcessRegistrationWorkerBodyDto = z.infer<typeof ProcessRegistrationWorkerBodySchema>;
