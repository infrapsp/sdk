import { Result } from '../types/result.ts';
import { CommonError } from '../errors/common_error.ts';

export function validateResponse<T>(response: { data: T; status: number }): Result<T> {
  if (response.status >= 200 && response.status < 400) return response.data;

  return new CommonError({
    code: 'INFRAPSP_CLIENT_ERROR',
    status: 500,
    detail: response,
  });
}
