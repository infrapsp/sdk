import { EmptyObject } from '../../../modules/types/base/types.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';

export enum TransactionStatus {
  CREATED = 'created',
  WAITING_PAYMENT = 'waiting_payment',
  PAID = 'paid',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  FAILED = 'failed',
  EXPIRED = 'expired',
  AUTHORIZED = 'authorized',
  PRE_AUTHORIZED = 'pre_authorized',
  CHARGEDBACK = 'chargedback',
  UNDER_REVIEW = 'under_review',
}

export enum TransactionRefundStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  UNKNOWN = 'unknown',
}

export type PixMethodSettings = {
  expiresIn: number;
  additionalInfo: { key: string; value: string }[];
  payerRequest?: string | null;
};

export type PixMethodData = {
  qrCode: string;
  expirationDate: Date;
  url: string;
};

export type PixPaidDataPayer = {
  name: string;
  documentType: DocumentType;
  documentNumber: string;
  ispb: string;
  bankName: string;
  accountNumber: string;
  accountDigit: string;
  bankBranch: string;
};

export type PixPaidData = {
  endToEndId: string;
  payer?: PixPaidDataPayer;
};

export type CreditCardMethodSettings = {
  installments: number;
  cardToken: string;
  expirationYear: string;
  expirationMonth: string;
  cvvToken: string;
  cardholderName: string;
  brand: string;
  bin: string;
  last4: string;
  hasChargebackGuarantee?: boolean;
};

export type CreditCardMethodData = {
  nsu: string;
  authorizationCode: string;
  brandId: string;
};

export type CreditCardPaidData = {
  authorizationCode: string;
  nsu: string;
};

export type TransactionAntifraudData = EmptyObject | {
  score?: number;
  status?: string;
};

export type TransactionMethodSettings = EmptyObject | PixMethodSettings | CreditCardMethodSettings;

export type TransactionMethodData = EmptyObject | PixMethodData | CreditCardMethodData;

export type TransactionPaidData = EmptyObject | PixPaidData | CreditCardPaidData;
