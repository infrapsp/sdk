import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { BankResponseDto } from '../../../modules/types/bank/bank_response.ts';

export class BankHandler {
  private readonly basePath = '/v1/banks';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(requestInit: RequestInit = {}): AsyncResult<BankResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
