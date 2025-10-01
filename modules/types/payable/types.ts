export enum PayableMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
}

export enum PayableStatus {
  CANCELED = 'canceled',
  PAID = 'paid',
  WAITING_FUNDS = 'waiting_funds',
}

export enum PayableType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum PayableEntity {
  TRANSFER = 'transfer',
  TRANSACTION = 'transaction',
  TRANSACTION_REFUND = 'transactionRefund',
}
