export enum InfraPSPErrorCode {
  // transaction related errors
  TRX_REF_TARGET_ACCOUNT_UNAVAILABLE = 'TRX_REF_TARGET_ACCOUNT_UNAVAILABLE',

  // transfer related errors
  TRF_PIX_KEY_NOT_FOUND = 'TRF_PIX_KEY_NOT_FOUND',

  // default
  UNKNOWN = '',
}
