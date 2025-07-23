import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.19.8';
import { TransactionStatsResponseDto } from '../../../modules/types/dashboard/transaction_stats_response.ts';
import { FindTransactionStatsQuerySchema } from '../../../modules/types/dashboard/transaction_stats_request.ts';

export class DashboardHandler {
  private readonly basePath = '/v1/dashboard';

  constructor(private readonly httpClient: HttpClient) {}

  async findTransactionStats(
    query?: z.input<typeof FindTransactionStatsQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionStatsResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
