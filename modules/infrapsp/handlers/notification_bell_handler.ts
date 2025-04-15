import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.18.3';
import { NotificationBellResponseDto } from '../../../modules/types/notification_bell/notification_bell_response.ts';
import { UpdateNotificationBellBodySchema } from '../../../modules/types/notification_bell/update_notification_bell_request.ts';

export class NotificationBellHandler {
  private readonly basePath = '/v1/notification-bells';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(requestInit: RequestInit = {}): AsyncResult<NotificationBellResponseDto[]> {
    const response = await this.httpClient.get(this.basePath, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async updateMany(
    body: z.input<typeof UpdateNotificationBellBodySchema>[],
    requestInit: RequestInit = {},
  ): AsyncResult<NotificationBellResponseDto[]> {
    const url = `${this.basePath}/seen`;

    const response = await this.httpClient.patch(`${url}`, {
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
