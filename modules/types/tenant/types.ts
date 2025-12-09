export enum TransactionMappingKey {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  ANTIFRAUD = 'antifraud',
}

export enum TransferMappingKey {
  PIX = 'pix',
}

export enum MerchantMappingKey {
  REGISTRATION = 'registration',
}

export type TransactionMapping = Partial<Record<TransactionMappingKey, string[]>>;

export type TransferMapping = Partial<Record<TransferMappingKey, string[]>>;

export type MerchantMapping = Partial<Record<MerchantMappingKey, string[]>>;

export type ItauProviderConfig = {
  certificateKey: string;
  certificateCrt: string;
  clientId: string;
  clientSecret: string;
  pixKey: string;
  transferPersonDocument: string;
  transferAccountBranch: string;
  transferAccountNumber: string;
  transferAccountType: string;
  transferPersonType: string;
  transferModule: string;
};

export type LogtoProviderConfig = {
  baseUrl: string;
  audience: string;
};

export type RedeProviderConfig = {
  pv: string;
  token: string;
  chargebackClientId: string;
  chargebackClientSecret: string;
};

export type ClearsaleProviderConfig = {
  name: string;
  password: string;
};

export type CafProviderConfig = {
  apiKey: string;
  pjTemplateId: string;
  pfTemplateId: string;
  pjTransactionTemplateId: string;
  pfTransactionTemplateId: string;
};

export type B3ProviderConfig = {
  certificatePem: string;
  tenantId: string;
  tokenIssuer: string;
  documentNumber: string;
  orgId: string;
};
