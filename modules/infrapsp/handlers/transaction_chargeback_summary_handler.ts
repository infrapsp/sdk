import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.4.0';
import { isError } from '../../../modules/errors/is_error.ts';
import { FindTransactionChargebackSummaryQuerySchema } from '../../../modules/types/transaction_chargeback_summary/find_transaction_chargeback_summary_request.ts';
import { TransactionChargebackSummaryResponseDto } from '../../../modules/types/transaction_chargeback_summary/transaction_chargeback_summary_response.ts';

export class TransactionChargebackSummaryHandler {
  private readonly basePath = '/v1/transaction-chargeback-summaries';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<TransactionChargebackSummaryResponseDto> {
    const response = await this.httpClient.get(`${this.basePath}/${id}`, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findMany(
    query?: z.input<typeof FindTransactionChargebackSummaryQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionChargebackSummaryResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
