import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { AnalysisResponseDto } from '../../../modules/types/aml/analysis_response.ts';
import { UpdateAnalysisBodySchema } from '../../../modules/types/aml/update_analysis_request.ts';
import { FindAnalysisQuerySchema } from '../../../modules/types/aml/find_analysis_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class AnalysisHandler {
  private readonly basePath = '/v1/analysis';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<AnalysisResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: z.input<typeof FindAnalysisQuerySchema>, requestInit: RequestInit = {}): AsyncResult<AnalysisResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: z.input<typeof UpdateAnalysisBodySchema>,
    requestInit: RequestInit,
  ): AsyncResult<AnalysisResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.patch(`${url}/${id}`, {
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
