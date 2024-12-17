import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreatePreTransactionBodySchema } from '../../../modules/types/pre_transaction/create_pre_transaction_request.ts';
import { PreTransactionResponseDto } from '../../../modules/types/pre_transaction/pre_transaction_response.ts';
import { FindPreTransactionQuerySchema } from '../../../modules/types/pre_transaction/find_pre_transaction_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type z from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export class PreTransactionHandler {
  private readonly basePath = '/v1/pre-transactions';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreatePreTransactionBodySchema>, requestInit: RequestInit = {}): AsyncResult<PreTransactionResponseDto> {
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

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<PreTransactionResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(`${url}/${id}`, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: z.input<typeof FindPreTransactionQuerySchema>, requestInit: RequestInit = {}): AsyncResult<PreTransactionResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async cancel(preTransactionId: string, requestInit: RequestInit = {}): AsyncResult<PreTransactionResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(`${url}/${preTransactionId}/cancel`, {
      ...requestInit,
      body: JSON.stringify({}),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
