import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { InterTransferResponseDto } from '../../../modules/types/inter_transfer/inter_transfer_response.ts';
import { CreateInterTransferBodySchema } from '../../../modules/types/inter_transfer/create_inter_transfer_request.ts';
import { UpdateInterTransferBodySchema } from '../../../modules/types/inter_transfer/update_inter_transfer_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.4.0';

export class InterTransferHandler {
  private readonly basePath = '/v1/admin/adjustments/inter-transfers';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreateInterTransferBodySchema>, requestInit: RequestInit = {}): AsyncResult<InterTransferResponseDto> {
    const response = await this.httpClient.post(this.basePath, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: z.input<typeof UpdateInterTransferBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<InterTransferResponseDto> {
    const response = await this.httpClient.patch(`${this.basePath}/${id}`, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findMany(requestInit: RequestInit = {}): AsyncResult<InterTransferResponseDto[]> {
    const response = await this.httpClient.get(this.basePath, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
