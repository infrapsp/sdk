import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateApiKeyBodySchema } from '../../../modules/types/api_key/create_api_key_request.ts';
import { ApiKeyResponseDto } from '../../../modules/types/api_key/api_key_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
export class ApiKeyHandler {
  private readonly basePath = '/v1/auth/api-keys';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreateApiKeyBodySchema>, requestInit: RequestInit = {}): AsyncResult<ApiKeyResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(requestInit: RequestInit = {}): AsyncResult<ApiKeyResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async delete(
    id: string,
    requestInit: RequestInit = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.httpClient.delete(`${url}/${id}`, {
      ...requestInit,
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
