import { Result } from '../../modules/types/result.ts';
import { InfraPSPClientError } from '../../modules/infrapsp/errors.ts';
import { InfraPSPResponse } from '../../modules/infrapsp/types/infrapsp_response.ts';

export function validateResponse<T>(response: InfraPSPResponse<T>): Result<InfraPSPResponse<T>> {
  if (response.status >= 200 && response.status < 400) return response;

  return new InfraPSPClientError({
    code: 'INFRAPSP_CLIENT_ERROR',
    status: 500,
    detail: response,
  });
}
