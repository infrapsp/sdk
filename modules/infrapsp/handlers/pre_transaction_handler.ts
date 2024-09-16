import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreatePreTransactionBodyDto } from '../../../modules/types/pre_transaction/create_pre_transaction_request.ts';
import { PreTransactionResponseDto } from '../../../modules/types/pre_transaction/pre_transaction_response.ts';
import { FindPreTransactionQueryDto } from '../../../modules/types/pre_transaction/find_pre_transaction_request.ts';

export class PreTransactionHandler {
  private readonly basePath = 'v1/pre-transactions';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreatePreTransactionBodyDto, options?: Options): AsyncResult<PreTransactionResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<PreTransactionResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async find(id: string, options?: Options): AsyncResult<PreTransactionResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.get(`${url}/${id}`, options);

    const data = await response.json<PreTransactionResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindPreTransactionQueryDto>, options?: Options): AsyncResult<PreTransactionResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<PreTransactionResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async cancel(preTransactionId: string, options?: Options): AsyncResult<PreTransactionResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(`${url}/${preTransactionId}/cancel`, {
      ...options,
      body: JSON.stringify({}),
    });

    const data = await response.json<PreTransactionResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
