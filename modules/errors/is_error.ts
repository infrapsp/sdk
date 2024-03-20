import { CommonError } from '../../modules/errors/common_error.ts';

export function isError<T>(value: T | CommonError<unknown>): value is CommonError<unknown> {
  if (typeof (value as CommonError<unknown>)?._isError === 'function' && (value as CommonError<unknown>)._isError()) {
    return true;
  } else {
    return false;
  }
}
