import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { RecordResponseDto } from '../../../modules/types/record/record_response.ts';
import { FindRecordQuerySchema } from '../../../modules/types/record/find_record_request.ts';
import { CreateRecordBodySchema, RestrictCreateRecordBodySchema } from '../../../modules/types/record/create_record_request.ts';
import { UpdateRecordBodySchema } from '../../../modules/types/record/update_record_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class RecordHandler {
  private readonly restrictBasePath = '/v1/admin/records';
  private readonly basePath = '/v1/records';

  constructor(private readonly httpClient: HttpClient) {}

  async create(
    body: z.input<typeof CreateRecordBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<RecordResponseDto> {
    const url = this.basePath;

    const form = new FormData();
    form.append('entity', body.entity);
    form.append('entityId', body.entityId);
    form.append('request', body.request);

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

  async restrictCreate(
    body: z.input<typeof RestrictCreateRecordBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<RecordResponseDto> {
    const url = this.restrictBasePath;

    const form = new FormData();
    form.append('entity', body.entity);
    form.append('entityId', body.entityId);
    form.append('title', body.title);
    form.append('merchantId', body.merchantId);

    if (body.comment) form.append('comment', body.comment);

    if (!body.attachments) body.attachments = [];

    if (!Array.isArray(body.attachments)) body.attachments = [body.attachments];

    for (const attachment of body.attachments) form.append('attachments', attachment);

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
    body: z.input<typeof UpdateRecordBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<RecordResponseDto> {
    const url = `${this.restrictBasePath}/${id}`;

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
    query?: z.input<typeof FindRecordQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<RecordResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? `${this.restrictBasePath}?${queryPath}` : this.restrictBasePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(id: string, requestInit: RequestInit = {}): AsyncResult<void> {
    const url = `${this.restrictBasePath}/${id}`;

    const response = await this.httpClient.delete(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
