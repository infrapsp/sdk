import { MerchantBankAccountType } from '../../../modules/types/merchant/types.ts';

export enum UrContractEffectRegistryStatus {
  CREATED = 'created',
  SCHEDULED = 'scheduled',
  WAITING_LIQUIDATE = 'waiting_liquidate',
  LIQUIDATED = 'liquidated',
  SKIPPED = 'skipped',
  CANCELED = 'canceled',
}

export enum UrContractEffectSlcStatus {
  WAITING_ACTION = 'waiting_action',
  WAITING_INFORM = 'waiting_inform',
  INFORMED = 'informed',
  NOT_INFORMED = 'not_informed',
}

export type UrContractEffectBankAccount = {
  ispb: string;
  bank: string;
  bankBranch: string;
  accountNumber: string;
  accountDigit: string;
  accountType: MerchantBankAccountType;
  documentNumber: string;
};
