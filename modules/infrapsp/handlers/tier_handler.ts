import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { TierResponseDto } from '../../../modules/types/tier/tier_response.ts';
import { CreateTierBodyDto } from '../../../modules/types/tier/create_tier_request.ts';
import { UpdateTierBodyDto } from '../../../modules/types/tier/update_tier_request.ts';

export class TierHandler {
  private readonly basePath = 'v1/tiers';
  private readonly restrictBasePath = 'v1/admin/tiers';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateTierBodyDto, options?: Options): AsyncResult<TierResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      json: body,
    });

    const data = await response.json<TierResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async update(id: string, body: UpdateTierBodyDto, options?: Options): AsyncResult<TierResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.kyInstance.patch(`${url}/${id}`, {
      ...options,
      json: body,
    });

    const data = await response.json<TierResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(options: Options): AsyncResult<TierResponseDto[]> {
    const url = this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<TierResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async find(id: string, options?: Options): AsyncResult<TierResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.get(`${url}/${id}`, options);

    const data = await response.json<TierResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
