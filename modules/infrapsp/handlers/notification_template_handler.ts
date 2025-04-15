import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.18.3';
import { NotificationTemplateResponseDto } from '../../../modules/types/notification_template/notification_template_response.ts';
import { FindNotificationTemplateQuerySchema } from '../../../modules/types/notification_template/find_notification_template_request.ts';
import { UpdateNotificationTemplateBodySchema } from '../../../modules/types/notification_template/update_notification_template_request.ts';

export class NotificationTemplateHandler {
  private readonly restrictBasePath = '/v1/admin/notification-templates';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<NotificationTemplateResponseDto> {
    const url = `${this.restrictBasePath}/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(
    query?: z.input<typeof FindNotificationTemplateQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<NotificationTemplateResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.restrictBasePath + '?' + queryPath : this.restrictBasePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: z.input<typeof UpdateNotificationTemplateBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<NotificationTemplateResponseDto> {
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
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(
    id: string,
    requestInit: RequestInit = {},
  ): AsyncResult<void> {
    const url = `${this.restrictBasePath}/${id}`;

    const response = await this.httpClient.delete(url, {
      ...requestInit,
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
