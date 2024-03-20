import { KyInstance, Options } from 'npm:ky@1.2.0';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateMerchantBodyDto } from '../../../modules/types/merchant/create_merchant_request.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { InfraPSPResponse } from '../../../modules/infrapsp/types/infrapsp_response.ts';

export class MerchantsHandler {
  private readonly basePath = 'v1/merchants';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateMerchantBodyDto, options?: Options): AsyncResult<InfraPSPResponse<MerchantResponseDto>> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<MerchantResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
