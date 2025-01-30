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
