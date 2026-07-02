export enum WebhookEvent {
  TRANSACTION = 'transaction',
  PRE_TRANSACTION = 'pre_transaction',
  TRANSFER = 'transfer',
  FEE_RULE = 'fee_rule',
  MERCHANT = 'merchant',
  REGISTRATION = 'registration',
}

export interface WebhookInPayload<T> {
  data: T;
  meta: {
    ip: string;
    provider: string;
    userAgent: string;
  };
}

export interface WebhookOutPayload<T> {
  id: string;
  event: string;
  entityId?: string;
  data: T;
  meta: {
    url: string;
  };
}
