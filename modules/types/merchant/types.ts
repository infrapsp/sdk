export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export enum MerchantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BLOCKED = 'blocked',
}

export enum DocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
}

export enum MerchantAutoTransferFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTLHY = 'monthly',
}

export enum MerchantPaymentMethodStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  BLOCKED = 'blocked',
}

export enum MerchantPaymentMethod {
  PIX = 'pix',
  CREDIT_CARD = 'creditCard',
  BOLETO = 'boleto',
}

export type MerchantAutoTransferSettings = { isEnabled: false } | {
  isEnabled: true;
  frequency: MerchantAutoTransferFrequency;
  day?: number;
  residualAmount: number;
};

export type MerchantEmailSettings = {
  transactionFieldId: string;
  transactionFieldName: string;
  isEnabled: boolean;
};

export type MerchantCreditCardSettings = {
  threeDS: {
    mode: 'off' | 'optional' | 'required';
    optionalThreshold: {
      minAmount: number;
    };
  };
};
