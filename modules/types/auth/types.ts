export enum MerchantRole {
  MERCHANT = 'merchant',
  MERCHANT_GUEST = 'merchant_guest',
  MERCHANT_OPERATOR = 'merchant_operator',
}

export enum Role {
  SUPER = 'super',
  OPERATOR = 'operator',
  SUPPORT = 'support',
  TENANT = 'tenant',
  MERCHANT = 'merchant',
  CUSTOMER = 'customer',
  RISK = 'risk',
  NONE = 'none',

  // Merchant Roles
  MERCHANT_GUEST = 'merchant_guest',
  MERCHANT_OPERATOR = 'merchant_operator',
}

export enum TokenType {
  JWT = 'jwt',
  API_KEY = 'api_key',
  NONE = 'none',
}

export enum AuthScope {
  API_KEY = 'api_key',
  BALANCE = 'balance',
  DASHBOARD = 'dashboard',
  EXTERNAL_AUTH = 'external_auth',
  FEE_PROPOSAL = 'fee_proposal',
  FEE_RULE = 'fee_rule',
  INVOICE = 'invoice',
  MERCHANT = 'merchant',
  NOTIFICATION_BELL = 'notification_bell',
  OPERATION = 'operation',
  PAYABLE = 'payable',
  PRE_TRANSACTION = 'pre_transaction',
  TRANSACTION = 'transaction',
  TRANSACTION_CHARGEBACK = 'transaction_chargeback',
  TRANSACTION_REFUND = 'transaction_refund',
  TRANSFER = 'transfer',
}
