import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum TransactionStatus {
  CREATED = 'created',
  WAITING_PAYMENT = 'waiting_payment',
  PAID = 'paid',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

export enum TransactionRefundStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export enum PaymentMethod {
  PIX = 'pix',
  BOLETO = 'boleto',
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

export type PixPaidData = {
  payer: string;
  endToEndId: string;
};

export type BoletoMethodSettings = {
  dueAt: Date;
};

export type BoletoMethodData = {
  barcode: string;
};

export type BoletoPaidData = {
  payer: string;
};

export type TransactionMethodSettings = EmptyObject | PixMethodSettings | BoletoMethodSettings;

export type TransactionMethodData = EmptyObject | PixMethodData | BoletoMethodData;

export type TransactionPaidData = EmptyObject | PixPaidData | BoletoPaidData;

export type TransactionPaymentLinkSettings = {
  isEnabled: false;
} | {
  isEnabled: true;
  expirationDate: Date;
  availablePaymentMethods: PaymentMethod[];
  sourceTransactionId?: string | null;
  previousTransactionId?: string | null;
};
