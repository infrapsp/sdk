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

export type PixRefundedData = {
  returnId: string;
  amount: number;
  refundedAt: Date;
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

export type BoletoRefundedData = {
  amount: number;
  refundedAt: Date;
};

export type TransactionMethodSettings = EmptyObject | PixMethodSettings | BoletoMethodSettings;

export type TransactionMethodData = EmptyObject | PixMethodData | BoletoMethodData;

export type TransactionPaidData = EmptyObject | PixPaidData | BoletoPaidData;

export type TransactionRefundedData = EmptyObject | PixRefundedData | BoletoRefundedData;

export type TransactionPaymentLinkSettings = {
  isEnabled: false;
} | {
  isEnabled: true;
  isRetryUsed: boolean;
  attempts: number;
  maxAttempts: number;
  expirationDate: Date;
  availablePaymentMethods: PaymentMethod[];
  sourceTransactionId?: string | null;
  previousTransactionId?: string | null;
};
