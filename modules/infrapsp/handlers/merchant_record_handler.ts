import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { MerchantResponseDto } from '../../../modules/types/merchant/merchant_response.ts';
import { MerchantRecordRequestResponseDto, MerchantRecordResponseDto } from '../../../modules/types/merchant_record/merchant_record_response.ts';
import { FindMerchantRecordQuerySchema, FindMerchantRecordRequestQuerySchema } from '../../../modules/types/merchant_record/find_merchant_record_request.ts';
import { CreateMerchantRecordBodySchema } from '../../../modules/types/merchant_record/create_merchant_record_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.18.3';
import { UpdateMerchantRecordBodySchema } from '../../../modules/types/merchant_record/update_merchant_record_request.ts';

export class MerchantRecordHandler {
  private readonly restrictBasePath = '/v1/admin/merchants';
  private readonly basePath = '/v1/merchants';

  constructor(private readonly httpClient: HttpClient) {}

  async create(
    merchantId: string,
    body: z.input<typeof CreateMerchantRecordBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<MerchantResponseDto> {
    const url = `${this.basePath}/${merchantId}/records`;

    const form = new FormData();

    if ('request' in body) {
      form.append('request', body.request);
    } else {
      form.append('title', body.title);

      if (body.comment) form.append('comment', body.comment);

      if (!body.attachments) body.attachments = [];

      if (!Array.isArray(body.attachments)) body.attachments = [body.attachments];

      for (const attachment of body.attachments) form.append('attachments', attachment);
    }

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: form,
      headers: {
        ...requestInit.headers,
      },
    });

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    merchantId: string,
    body: z.input<typeof UpdateMerchantRecordBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<MerchantResponseDto> {
    const url = `${this.restrictBasePath}/${merchantId}/records/${id}`;

    const response = await this.httpClient.patch(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findMany(
    merchantId: string,
    query?: z.input<typeof FindMerchantRecordQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<MerchantRecordResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? `${this.restrictBasePath}/${merchantId}/records?${queryPath}` : `${this.restrictBasePath}/${merchantId}/records`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findManyRequests(
    query?: z.input<typeof FindMerchantRecordRequestQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<MerchantRecordRequestResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? `${this.restrictBasePath}/records/requests?${queryPath}` : `${this.restrictBasePath}/records/requests`;

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
