import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateWebhookBodySchema } from '../../../modules/types/webhook/create_webhook_request.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { WebhookResponseDto } from '../../../modules/types/webhook/webhook_response.ts';
import { UpdateWebhookBodySchema } from '../../../modules/types/webhook/update_webhook_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class WebhookHandler {
  private readonly basePath = '/v1/webhooks';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreateWebhookBodySchema>, requestInit: RequestInit = {}): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(url, {
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

  async findMany(requestInit: RequestInit = {}): AsyncResult<WebhookResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(id: string, body: z.input<typeof UpdateWebhookBodySchema>, requestInit: RequestInit = {}): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

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

  async delete(
    id: string,
    requestInit: RequestInit = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.httpClient.delete(`${url}/${id}`, {
      ...requestInit,
    });

    if (isError(response)) return response;

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
