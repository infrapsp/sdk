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

export type MerchantAutoTransferSettings = { isEnabled: false } | {
  isEnabled: true;
  pixDictKey: string;
  frequency: MerchantAutoTransferFrequency;
  day?: number;
};
