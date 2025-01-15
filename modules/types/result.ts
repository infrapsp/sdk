import { CommonError } from '../../modules/errors/common_error.ts';

// Result types for function returns: used arrays for easy naming during destructuring assign
export type Result<T, TErrorDetail = Record<string, unknown>> = T | CommonError<TErrorDetail>;
export type AsyncResult<T, TErrorDetail = Record<string, unknown>> = Promise<Result<T, TErrorDetail>>;
