import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ApiKeyResponseDto } from '../../../modules/types/api_key/api_key_response.ts';

export class ExternalAuthHandler {
  private readonly basePath = 'v1/auth/external-auth/merchants';

  constructor(private readonly kyInstance: KyInstance) {}

  async findMany(options?: Options): AsyncResult<ApiKeyResponseDto[]> {
    const url = this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ApiKeyResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
