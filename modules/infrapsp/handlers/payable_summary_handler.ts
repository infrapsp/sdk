import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { PayableSummaryResponseDto } from '../../../modules/types/payable_summary/payable_summary_response.ts';
import { FindPayableSummaryQuerySchema } from '../../../modules/types/payable_summary/find_payable_summary_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type z from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export class PayableSummaryHandler {
  private readonly basePath = '/v1/payable-summary';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(query?: z.input<typeof FindPayableSummaryQuerySchema>, requestInit: RequestInit = {}): AsyncResult<PayableSummaryResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.paymentDateLte) queryPath.set('paymentDateLte', new Date(query.paymentDateLte).toISOString());
    if (query?.paymentDateGte) queryPath.set('paymentDateGte', new Date(query.paymentDateGte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
