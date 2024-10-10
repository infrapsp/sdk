import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransactionBodyDto } from '../../../modules/types/transaction/create_transaction_request.ts';
import { TransactionResponseDto } from '../../../modules/types/transaction/transaction_response.ts';
import { FindTransactionQueryDto } from '../../../modules/types/transaction/find_transaction_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class TransactionHandler {
  private readonly basePath = '/v1/transactions';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: CreateTransactionBodyDto, options: RequestInit = {}): AsyncResult<TransactionResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async find(id: string, options: RequestInit = {}): AsyncResult<TransactionResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(`${url}/${id}`, options);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindTransactionQueryDto>, options: RequestInit = {}): AsyncResult<TransactionResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, options);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
