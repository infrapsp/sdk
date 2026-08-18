import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum RegistrationStatus {
  CREATED = 'created',
  APPROVED = 'approved',
  PROCESSING = 'processing',
  PENDING = 'pending',
  REFUSED = 'refused',
}

export enum RegistrationType {
  ONBOARDING = 'onboarding',
  REGULARIZATION = 'regularization',
}

export type RegistrationMerchantData = EmptyObject | {
  url: string;
  personName: string;
  personEmail: string;
  companyName?: string;
  tradingName: string;
  cnae?: string;
  monthlyBilling: number;
  phoneNumber: string;
  billing: {
    email: string;
    address: {
      zipCode: string;
      line1: string;
      line2?: string;
      neighborhood: string;
      number: string;
    };
  };
};
