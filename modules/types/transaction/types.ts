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
  WAITING_THREE_DS = 'waiting_three_ds',
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
  BOLETO = 'boleto',
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

export type ThreeDSDevice = {
  colorDepth: number;
  deviceType3ds: 'BROWSER' | 'DEVICE';
  javaEnabled: boolean;
  language: string;
  screenHeight: number;
  screenWidth: number;
  timeZoneOffset: string;
};

export type ThreeDS = {
  device: ThreeDSDevice;
  redirectUrl: string;
  ip: string;
  userAgent: string;
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
  threeDS?: ThreeDS;
};

export type CreditCardMethodData = {
  nsu: string;
  authorizationCode: string;
  brandId: string;
  threeDSUrl?: string;
};

export type ThreeDSMethodData = {
  threeDSUrl: string;
};

export type CreditCardPaidData = {
  authorizationCode: string;
  nsu: string;
};

export type TransactionAntifraudData = EmptyObject | {
  segment?: string;
  score?: number;
  status?: string;
};

export type TransactionContext = EmptyObject | {
  deviceFingerprint?: string;
  ip?: string;
  userAgent?: string;
};

export type BoletoMethodSettings = {
  expirationDate: string;
  documentKind: 'DM' | 'FS';
  ourNumber: string;
};

export type BoletoMethodData = {
  pixBase64: string;
  pixQrCode: string;
  pixTxid: string;
  digitableLine: string;
  barcode: string;
  url: string;
};

export type BoletoPaidDataPayer = {
  name?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  ispb?: string;
  bankName?: string;
  accountNumber?: string;
  accountDigit?: string;
  bankBranch?: string;
};

export type BoletoPaidData = {
  paymentOrigin: 'boleto' | 'pix';
  pixEndToEndId?: string;
  payer?: BoletoPaidDataPayer;
};

export type TransactionMethodSettings = EmptyObject | PixMethodSettings | CreditCardMethodSettings | BoletoMethodSettings;

export type TransactionMethodData = EmptyObject | PixMethodData | CreditCardMethodData | BoletoMethodData | ThreeDSMethodData;

export type TransactionPaidData = EmptyObject | PixPaidData | CreditCardPaidData | BoletoPaidData;
