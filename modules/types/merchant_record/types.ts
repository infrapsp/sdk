export type MerchantRecordAttachment = {
  path: string;
};

export enum MerchantRecordStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REFUSED = 'refused',
}

export enum MerchantRecordRequestType {
  TIER_UPGRADE = 'tier_upgrade',
}
