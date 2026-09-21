export enum OperationStatus {
  AVAILABLE = 'available',
  WAITING_FUNDS = 'waiting_funds',
}

export enum OriginEntity {
  TRANSACTION = 'transaction',
  TRANSFER = 'transfer',
}

export enum OriginMethod {
  PIX = 'pix',
  SLC = 'slc',
  CREDIT_CARD = 'credit_card',
  INTER = 'inter',
  BOLETO = 'boleto',
}
