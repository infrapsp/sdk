import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateMerchantBodyDto } from '../../../modules/types/merchant/create_merchant_request.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { UpdateMerchantBodyDto } from '../../../modules/types/merchant/update_merchant_request.ts';
import { FindMerchantQueryDto } from '../../../modules/types/merchant/find_merchant_request.ts';

export class MerchantHandler {
  private readonly basePath = 'v1/merchants';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateMerchantBodyDto, options?: Options): AsyncResult<MerchantResponseDto> {
    const url = 'merchants';

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<MerchantResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async find(id: string, options?: Options): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<MerchantResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMe(options?: Options): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/me`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<MerchantResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindMerchantQueryDto>, options?: Options): AsyncResult<MerchantResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<MerchantResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: UpdateMerchantBodyDto,
    options: Options = {},
  ): AsyncResult<MerchantResponseDto> {
    const url = this.basePath;
    const response = await this.kyInstance.patch(`${url}/${id}`, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<MerchantResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
