import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateWebhookBodyDto } from '../../../modules/types/webhook/create_webhook_request.ts';
import { WebhookResponseDto } from '../../../modules/types/webhook/webhook_response.ts';
import { UpdateWebhookBodyDto } from '../../../modules/types/webhook/update_webhook_request.ts';

export class WebhookHandler {
  private readonly basePath = 'v1/webhooks';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateWebhookBodyDto, options?: Options): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<WebhookResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(options?: Options): AsyncResult<WebhookResponseDto[]> {
    const url = this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<WebhookResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async update(id: string, body: UpdateWebhookBodyDto, options?: Options): AsyncResult<WebhookResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.patch(`${url}/${id}`, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<WebhookResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(
    id: string,
    options: Options = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.kyInstance.delete(`${url}/${id}`, {
      ...options,
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
