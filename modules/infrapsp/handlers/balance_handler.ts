import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { BalanceResponseDto } from '../../../modules/types/balance/balance_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class BalanceHandler {
  private readonly basePath = '/v1/balance';

  constructor(private readonly httpClient: HttpClient) {}

  async find(requestInit: RequestInit = {}): AsyncResult<BalanceResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
