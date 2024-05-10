import { CommonError } from '../../modules/errors/common_error.ts';

export function isError<T>(value: T | CommonError): value is CommonError {
  if (typeof (value as CommonError)?._isError === 'function' && (value as CommonError)._isError()) {
    return true;
  } else {
    return false;
  }
}
