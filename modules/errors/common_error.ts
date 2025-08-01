/** Application common error for centralized error handling. Extend this error class in your application to add your typed error codes */
export class CommonError<TDetail = Record<string, unknown>> {
  status?: number;
  code?: string;
  message?: string;
  detail?: TDetail;
  internal: { message?: string; code?: string };
  stack?: string;

  constructor(object: ErrorObject<CommonError<TDetail>>) {
    this.code = object.code;
    this.detail = object.detail;
    this.internal = object.internal || {};
    this.message = object.message;
    this.stack = object.stack ?? new Error().stack;
    this.status = object.status;
  }

  // Needed for type predicate check on isError
  _isError() {
    return true;
  }
}

export type ErrorObject<T> = Omit<T, '_isError' | 'internal'> & { internal?: { message?: string; code?: string } | undefined };

// Common Errors
export const InternalServerError = () =>
  new CommonError({
    message: 'internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
  });

export const BadRequestError = () =>
  new CommonError({
    message: 'bad request',
    code: 'BAD_REQUEST',
    status: 400,
  });

export const ConflictError = () =>
  new CommonError({
    message: 'conflict',
    code: 'CONFLICT',
    status: 409,
  });

export const NotFoundError = () =>
  new CommonError({
    message: 'not found',
    code: 'NOT_FOUND',
    status: 404,
  });

export const UnauthorizedError = () =>
  new CommonError({
    message: 'unauthorized',
    code: 'UNAUTHORIZED',
    status: 401,
  });

export const ForbiddenError = () =>
  new CommonError({
    message: 'forbbiden',
    code: 'FORBIDDEN',
    status: 403,
  });

export const ValidationError = () =>
  new CommonError({
    message: 'validation error',
    code: 'VALIDATION_ERROR',
    status: 400,
  });

export const NotImplementedError = () =>
  new CommonError({
    message: 'not implemented error',
    code: 'NOT_IMPLEMENTED_ERROR',
    status: 501,
  });
