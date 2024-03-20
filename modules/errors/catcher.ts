import { AsyncResult, Result } from '../../modules/types/result.ts';
import { CommonError, CommonErrorCodes } from '../../modules/errors/common_error.ts';

/** Converts an throwable function to an error-returning one. Additionally you can provide a mapper to handle the exception in a custom way */
// deno-lint-ignore no-explicit-any
export function catcher<T, U extends CommonError<unknown> = CommonError<unknown>>(fn: () => T, mapper?: (e: any) => U): Result<T> {
  try {
    return fn();
  } catch (e) {
    let err: CommonError<unknown>;
    if (mapper) {
      err = mapper(e);
    } else {
      err = new CommonError<CommonErrorCodes>({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal server error. try again later.',
        stack: e.stack,
        status: 500,
        internalMessage: `exception {e.name}: {e.message}`,
      });
    }
    return err;
  }
}

/** Converts an throwable async function to an error-returning one. Additionally you can provide a mapper to handle the exception in a custom way */
export async function catcherAsync<T, U extends CommonError<unknown> = CommonError<unknown>>(
  promisefn: () => Promise<T>,
  // deno-lint-ignore no-explicit-any
  mapper?: (e: any) => U,
): AsyncResult<T> {
  try {
    return await promisefn();
  } catch (e) {
    let err: CommonError<unknown>;
    if (mapper) {
      err = mapper(e);
    } else {
      err = new CommonError<CommonErrorCodes>({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal server error. try again later.',
        stack: e.stack,
        status: 500,
        internalMessage: `exception {e.name}: {e.message}`,
      });
    }
    return err;
  }
}
