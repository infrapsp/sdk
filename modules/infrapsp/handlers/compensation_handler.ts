import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CompensationResponseDto } from '../../../modules/types/compensation/compensation_response.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { FindCompensationQuerySchema } from '../../../modules/types/compensation/find_compensation_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.4.0';

export class CompensationHandler {
  private readonly basePath = '/v1/compensations';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(query: z.input<typeof FindCompensationQuerySchema>, requestInit: RequestInit = {}): AsyncResult<CompensationResponseDto[]> {
    const queryPath = new URLSearchParams();

    if (query.payablePaymentDateGte) queryPath.set('payablePaymentDateGte', new Date(query.payablePaymentDateGte).toISOString());
    if (query.payablePaymentDateLte) queryPath.set('payablePaymentDateLte', new Date(query.payablePaymentDateLte).toISOString());
    if (query.urPaymentDateGte) queryPath.set('urPaymentDateGte', new Date(query.urPaymentDateGte).toISOString());
    if (query.urPaymentDateLte) queryPath.set('urPaymentDateLte', new Date(query.urPaymentDateLte).toISOString());

    const response = await this.httpClient.get(this.basePath + '?' + queryPath, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
