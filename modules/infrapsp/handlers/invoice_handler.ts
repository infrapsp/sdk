import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { InvoiceResponseDto } from '../../../modules/types/invoice/invoice_response.ts';
import { UpdateInvoiceBodySchema } from '../../../modules/types/invoice/update_invoice_request.ts';
import { FindInvoiceQuerySchema } from '../../../modules/types/invoice/find_invoice_request.ts';
import { GenerateInvoiceReportQuerySchema } from '../../../modules/types/invoice/generate_report_request.ts';
import { CommonError } from '../../../modules/errors/common_error.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.18.3';

export class InvoiceHandler {
  private readonly basePath = '/v1/invoices';

  constructor(private readonly httpClient: HttpClient) {}

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<InvoiceResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: z.input<typeof FindInvoiceQuerySchema>, requestInit: RequestInit = {}): AsyncResult<InvoiceResponseDto[]> {
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
    body: z.input<typeof UpdateInvoiceBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<InvoiceResponseDto> {
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

  async generateReport(query?: z.input<typeof GenerateInvoiceReportQuerySchema>, requestInit: RequestInit = {}): AsyncResult<Blob> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? `${this.basePath}/report` + '?' + queryPath : `${this.basePath}/report`;

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
