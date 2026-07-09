export type RecordAttachment = {
  path: string;
};

export enum RecordStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REFUSED = 'refused',
}

export enum RecordEntity {
  EXTERNAL_AUTH_USER = 'external_auth_user',
  MERCHANT = 'merchant',
  ANALYSIS = 'analysis',
  UNIT_RECEIVABLE = 'unit_receivable',
  TRANSACTION_CHARGEBACK = 'transaction_chargeback',
}

export enum RecordRequestType {
  TIER_UPGRADE = 'tier_upgrade',
}
