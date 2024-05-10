import { CommonError } from '../errors/common_error.ts';

// Result types for function returns: used arrays for easy naming during destructuring assign
export type Result<T> = T | CommonError;
export type AsyncResult<T> = Promise<Result<T>>;
