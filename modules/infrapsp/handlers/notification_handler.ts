import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { CreateNotificationBodyDto } from '../../../modules/types/notification/create_notification_request.ts';
import { NotificationResponseDto } from '../../../modules/types/notification/notification_response.ts';

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

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
