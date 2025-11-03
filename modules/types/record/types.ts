export type RecordAttachment = {
  path: string;
};

export enum RecordStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REFUSED = 'refused',
}

export enum RecordEntity {
  MERCHANT = 'merchant',
  ANALYSIS = 'analysis',
}

export enum RecordRequestType {
  TIER_UPGRADE = 'tier_upgrade',
}
