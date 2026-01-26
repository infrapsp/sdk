import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { CreateBulkNotificationCsvBodySchema, CreateNotificationBodyDto } from '../../../modules/types/notification/create_notification_request.ts';
import { NotificationResponseDto } from '../../../modules/types/notification/notification_response.ts';
import { z } from 'npm:@hono/zod-openapi@1.1.0';

export class NotificationHandler {
  private readonly restrictBasePath = '/v1/admin/notifications';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: CreateNotificationBodyDto, requestInit: RequestInit = {}): AsyncResult<NotificationResponseDto> {
    const url = `${this.restrictBasePath}`;

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

  async createBulkCsv(
    body: z.input<typeof CreateBulkNotificationCsvBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<undefined> {
    const url = `${this.restrictBasePath}/bulk`;

    const formData = new FormData();
    formData.append('file', body.file);
    formData.append('notificationTemplateId', body.notificationTemplateId);

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
}
