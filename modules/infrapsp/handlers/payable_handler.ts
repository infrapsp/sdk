import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { PayableResponseDto } from '../../../modules/types/payable/payable_response.ts';
import { FindPayableQuerySchema } from '../../../modules/types/payable/find_payable_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class PayableHandler {
  private readonly basePath = '/v1/payables';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<PayableResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(`${url}/${id}`, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: z.input<typeof FindPayableQuerySchema>, requestInit: RequestInit = {}): AsyncResult<PayableResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query && 'paymentDateLte' in query && query.paymentDateLte) queryPath.set('paymentDateLte', new Date(query.paymentDateLte).toISOString());
    if (query && 'paymentDateGte' in query && query.paymentDateGte) queryPath.set('paymentDateGte', new Date(query.paymentDateGte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
