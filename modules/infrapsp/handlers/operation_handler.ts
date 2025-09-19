import { AsyncResult } from '../../../modules/types/result.ts';
import { GenerateStatementQuerySchema } from '../../../modules/types/operation/generate_statement_request.ts';
import { CommonError } from '../../../modules/errors/common_error.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class OperationHandler {
  private readonly basePath = '/v1/operations';

  constructor(private readonly httpClient: HttpClient) {}

  async generateStatement(query?: z.input<typeof GenerateStatementQuerySchema>, requestInit: RequestInit = {}): AsyncResult<Blob> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.paymentDateGte) queryPath.set('paymentDateGte', new Date(query.paymentDateGte).toISOString());
    if (query?.paymentDateLte) queryPath.set('paymentDateLte', new Date(query.paymentDateLte).toISOString());

    const url = query ? `${this.basePath}/statement` + '?' + queryPath : `${this.basePath}/statements`;

    const response = await this.httpClient.get(url, requestInit);

    const status = response.status;

    if (status !== 200) {
      const data = await response.json();

      return new CommonError({
        code: 'INFRAPSP_CLIENT_ERROR',
        status: 500,
        detail: { data, status },
      });
    }

    return response.blob();
  }
}
