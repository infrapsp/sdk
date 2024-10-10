import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { MerchantRecordResponseDto } from '../../../modules/types/merchant_record/merchant_record_response.ts';
import { FindMerchantRecordQueryDto } from '../../../modules/types/merchant_record/find_merchant_record_request.ts';
import { CreateMerchantRecordBodyDto } from '../../../modules/types/merchant_record/create_merchant_record_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class MerchantRecordHandler {
  private readonly restrictBasePath = 'v1/admin/merchants';

  constructor(private readonly httpClient: HttpClient) {}

  async create(merchantId: string, body: CreateMerchantRecordBodyDto, requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto> {
    const url = `${this.restrictBasePath}/${merchantId}/records`;

    const form = new FormData();

    form.append('title', body.title);
    if (body.comment) form.append('comment', body.comment);

    for (const attachment of body.attachments) {
      form.append('attachments', attachment);
    }

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: form,
      headers: {
        ...requestInit.headers,
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findMany(
    merchantId: string,
    id: string,
    query: Partial<FindMerchantRecordQueryDto>,
    requestInit: RequestInit = {},
  ): AsyncResult<MerchantRecordResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? `${this.restrictBasePath}/${merchantId}/records/${id}?${queryPath}` : `${this.restrictBasePath}/${merchantId}/records/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(merchantId: string, id: string, requestInit: RequestInit = {}): AsyncResult<void> {
    const url = `${this.restrictBasePath}/${merchantId}/records/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
