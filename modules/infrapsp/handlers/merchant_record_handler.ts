import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { MerchantRecordResponseDto } from '../../../modules/types/merchant_record/merchant_record_response.ts';
import { FindMerchantRecordQueryDto } from '../../../modules/types/merchant_record/find_merchant_record_request.ts';
import { CreateMerchantRecordBodyDto } from '../../../modules/types/merchant_record/create_merchant_record_request.ts';

export class MerchantRecordHandler {
  private readonly restrictBasePath = 'v1/admin/merchants';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(merchantId: string, body: CreateMerchantRecordBodyDto, options?: Options): AsyncResult<MerchantResponseDto> {
    const url = `${this.restrictBasePath}/${merchantId}/records`;

    const response = await this.kyInstance.post(url, {
      json: body,
      ...options,
    });

    const data = await response.json<MerchantResponseDto>();

    return validateResponse({ data, status: response.status });
  }

  async findMany(
    merchantId: string,
    id: string,
    query: Partial<FindMerchantRecordQueryDto>,
    options?: Options,
  ): AsyncResult<MerchantRecordResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? `${this.restrictBasePath}/${merchantId}/records/${id}?${queryPath}` : `${this.restrictBasePath}/${merchantId}/records/${id}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<MerchantRecordResponseDto[]>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(merchantId: string, id: string, options?: Options): AsyncResult<void> {
    const url = `${this.restrictBasePath}/${merchantId}/records/${id}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<void>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
