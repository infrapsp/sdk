import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { RestrictUpdateMerchantBodyDto, UpdateMerchantBodyDto } from '../../../modules/types/merchant/update_merchant_request.ts';
import { FindMerchantQueryDto } from '../../../modules/types/merchant/find_merchant_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class MerchantHandler {
  private readonly basePath = '/v1/merchants';
  private readonly restrictBasePath = 'v1/admin/merchants';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMe(requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/me`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindMerchantQueryDto>, requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(id: string, body: UpdateMerchantBodyDto, requestInit?: RequestInit & { restrict?: false }): AsyncResult<MerchantResponseDto>;
  async update(id: string, body: RestrictUpdateMerchantBodyDto, requestInit?: RequestInit & { restrict?: true }): AsyncResult<MerchantResponseDto>;
  async update(
    id: string,
    body: UpdateMerchantBodyDto | RestrictUpdateMerchantBodyDto,
    requestInit: RequestInit & { restrict?: boolean } = { restrict: false },
  ): AsyncResult<MerchantResponseDto> {
    const url = requestInit.restrict ? this.restrictBasePath : this.basePath;

    const response = await this.httpClient.patch(`${url}/${id}`, {
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
}
