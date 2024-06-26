import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ImpersonateBodyDto } from '../../../modules/types/external_auth/impersonate_request.ts';

export class ImpersonateHandler {
  private readonly basePath = 'v1/auth/impersonate';

  constructor(private readonly kyInstance: KyInstance) {}

  async impersonate(
    body: ImpersonateBodyDto,
    options: Options = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.kyInstance.post(`${url}`, {
      json: body,
      ...options,
    });

    const data = await response.json<void>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async removeImpersonate(
    options: Options = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.kyInstance.delete(`${url}`, {
      ...options,
    });

    const data = await response.json<void>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
