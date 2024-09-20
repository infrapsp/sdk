import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { InvoiceResponseDto } from '../../../modules/types/invoice/invoice_response.ts';
import { UpdateInvoiceBodyDto } from '../../../modules/types/invoice/update_invoice_request.ts';
import { FindInvoiceQueryDto } from '../../../modules/types/invoice/find_invoice_request.ts';
import { GenerateInvoiceReportQueryDto } from '../../../modules/types/invoice/generate_report_request.ts';
import { CommonError } from '../../../modules/errors/common_error.ts';

export class InvoiceHandler {
  private readonly basePath = 'v1/invoices';

  constructor(private readonly kyInstance: KyInstance) {}

  async find(id: string, options?: Options): AsyncResult<InvoiceResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<InvoiceResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindInvoiceQueryDto>, options?: Options): AsyncResult<InvoiceResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<InvoiceResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: UpdateInvoiceBodyDto,
    options: Options = {},
  ): AsyncResult<InvoiceResponseDto> {
    const url = this.basePath;
    const response = await this.kyInstance.patch(`${url}/${id}`, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<InvoiceResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async generateReport(query?: Partial<GenerateInvoiceReportQueryDto>, options?: Options): AsyncResult<Blob> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', query.createdAtGte.toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', query.createdAtLte.toISOString());

    const url = query ? `${this.basePath}/report` + '?' + queryPath : `${this.basePath}/report`;

    const response = await this.kyInstance.get(url, options);

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
