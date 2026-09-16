import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { FeatureFlagResponseDto } from '../../../modules/types/feature_flag/feature_flag_response.ts';

export class FeatureFlagHandler {
  private readonly basePath = '/v1/feature-flags';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(requestInit: RequestInit = {}): AsyncResult<FeatureFlagResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
