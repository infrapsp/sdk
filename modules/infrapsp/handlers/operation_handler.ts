import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { GenerateStatementQueryDto } from '../../../modules/types/operation/generate_statement_request.ts';
import { CommonError } from '../../../modules/errors/common_error.ts';

export class OperationHandler {
  private readonly basePath = 'v1/operations';

  constructor(private readonly kyInstance: KyInstance) {}

  async generateStatement(query?: Partial<GenerateStatementQueryDto>, options?: Options): AsyncResult<Blob> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.paymentDateGte) queryPath.set('paymentDateGte', query.paymentDateGte.toISOString());
    if (query?.paymentDateLte) queryPath.set('paymentDateLte', query.paymentDateLte.toISOString());

    const url = query ? `${this.basePath}/statement` + '?' + queryPath : `${this.basePath}/statements`;

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
