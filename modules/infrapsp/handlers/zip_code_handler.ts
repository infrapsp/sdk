import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ZipCodeResponseDto } from '../../../modules/types/zip_code/zip_code_response.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class ZipCodeHandler {
  private readonly basePath = '/v1/zipcodes';

  constructor(private readonly httpClient: HttpClient) {}

  async find(zipCode: string, options: RequestInit = {}): AsyncResult<ZipCodeResponseDto> {
    const url = `${this.basePath}/${zipCode}`;

    const response = await this.httpClient.get(url, options);

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
