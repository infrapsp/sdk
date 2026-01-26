import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { RestrictUpdateMerchantBodySchema, UpdateMerchantBodySchema } from '../../../modules/types/merchant/update_merchant_request.ts';
import { FindMerchantQuerySchema } from '../../../modules/types/merchant/find_merchant_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';
import { UploadMerchantLogoBodySchema } from '../../../modules/types/merchant/upload_merchant_logo_request.ts';
import { isError } from '../../../modules/errors/is_error.ts';

export class MerchantHandler {
  private readonly basePath = '/v1/merchants';
  private readonly restrictBasePath = '/v1/admin/merchants';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMe(requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/me`;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: z.input<typeof FindMerchantQuerySchema>, requestInit: RequestInit = {}): AsyncResult<MerchantResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: z.input<typeof UpdateMerchantBodySchema>,
    requestInit?: RequestInit & { restrict?: false },
  ): AsyncResult<MerchantResponseDto>;
  async update(
    id: string,
    body: z.input<typeof RestrictUpdateMerchantBodySchema>,
    requestInit?: RequestInit & { restrict?: true },
  ): AsyncResult<MerchantResponseDto>;
  async update(
    id: string,
    body: z.input<typeof UpdateMerchantBodySchema> | z.input<typeof RestrictUpdateMerchantBodySchema>,
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

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async uploadLogo(
    id: string,
    body: z.input<typeof UploadMerchantLogoBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}/logo`;

    const formData = new FormData();
    formData.append('logo', body.logo);

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: formData,
      headers: {
        ...requestInit.headers,
      },
    });

    if (isError(response)) return response;

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }

  async deleteLogo(
    id: string,
    requestInit: RequestInit = {},
  ): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}/logo`;

    const response = await this.httpClient.delete(url, {
      ...requestInit,
      headers: {
        ...requestInit.headers,
      },
    });

    if (isError(response)) return response;

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
