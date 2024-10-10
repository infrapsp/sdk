import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateWebhookBodyDto } from '../../../modules/types/webhook/create_webhook_request.ts';
import { WebhookResponseDto } from '../../../modules/types/webhook/webhook_response.ts';
import { UpdateWebhookBodyDto } from '../../../modules/types/webhook/update_webhook_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class WebhookHandler {
  private readonly basePath = '/v1/webhooks';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: CreateWebhookBodyDto, options: RequestInit = {}): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(options: RequestInit = {}): AsyncResult<WebhookResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, options);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(id: string, body: UpdateWebhookBodyDto, options: RequestInit = {}): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.patch(`${url}/${id}`, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(
    id: string,
    options: RequestInit = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.httpClient.delete(`${url}/${id}`, {
      ...options,
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
