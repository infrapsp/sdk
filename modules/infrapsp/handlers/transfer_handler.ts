import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransferBodyDto } from '../../../modules/types/transfer/create_transfer_request.ts';
import { TransferResponseDto } from '../../../modules/types/transfer/transfer_response.ts';
import { FindTransferQueryDto } from '../../../modules/types/transfer/find_transfer_request.ts';

export class TransferHandler {
  private readonly basePath = 'v1/transfers';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateTransferBodyDto, options?: Options): AsyncResult<TransferResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<TransferResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async find(id: string, options?: Options): AsyncResult<TransferResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<TransferResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindTransferQueryDto>, options?: Options): AsyncResult<TransferResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<TransferResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
