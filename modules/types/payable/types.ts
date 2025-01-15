export enum PayableMethod {
  PIX = 'pix',
}

export enum PayableStatus {
  CANCELED = 'canceled',
  PAID = 'paid',
  WAITING_FUNDS = 'waiting_funds',
}

export enum PayableType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  REFUND = 'refund',
  REFUND_REVERSAL = 'refund_reversal',
}
