import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';
import { TransactionStatsResponseDto } from '../../../modules/types/dashboard/transaction_stats_response.ts';
import { FindTransactionStatsQuerySchema } from '../../../modules/types/dashboard/transaction_stats_request.ts';
import { FindTransactionChargebackStatsQuerySchema } from '../../../modules/types/dashboard/transaction_chargeback_stats_request.ts';
import { TransactionChargebackStatsResponseDto } from '../../../modules/types/dashboard/transaction_chargeback_stats_response.ts';

export class DashboardHandler {
  private readonly basePath = '/v1/dashboard';

  constructor(private readonly httpClient: HttpClient) {}

  async findTransactionStats(
    query?: z.input<typeof FindTransactionStatsQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionStatsResponseDto[]> {
    const base = `${this.basePath}/transaction-stats`;
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? base + '?' + queryPath : base;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findTransactionChargebackStats(
    query?: z.input<typeof FindTransactionChargebackStatsQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionChargebackStatsResponseDto[]> {
    const base = `${this.basePath}/transaction-chargeback-stats`;
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? base + '?' + queryPath : base;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
