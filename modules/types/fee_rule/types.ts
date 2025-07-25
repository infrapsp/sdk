import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum FeeRuleEntity {
  TRANSACTION = 'transaction',
  TRANSFER = 'transfer',
}

export enum FeeRuleMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
}

export enum FeeRulePayer {
  MERCHANT = 'merchant',
  TENANT = 'tenant',
}

export type FeeRuleCreditCard = EmptyObject | {
  anticipation: number;
  chargebackGuarantee: number;
  mdr: Array<{
    installment: number;
    percent: number;
  }>;
};
