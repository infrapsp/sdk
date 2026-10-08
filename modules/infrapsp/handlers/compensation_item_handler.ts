import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CompensationItemResponseDto } from '../../../modules/types/compensation/compensation_item_response.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { FindCompensationItemQuerySchema } from '../../../modules/types/compensation/find_compensation_item_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.4.0';

export class CompensationItemHandler {
  private readonly basePath = '/v1/compensation-items';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(
    query: z.input<typeof FindCompensationItemQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<CompensationItemResponseDto[]> {
    const queryPath = new URLSearchParams();

    if (query.payablePaymentDate) queryPath.set('payablePaymentDate', query.payablePaymentDate);
    if (query.urPaymentDate) queryPath.set('urPaymentDate', query.urPaymentDate);

    const response = await this.httpClient.get(this.basePath + '?' + queryPath, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
