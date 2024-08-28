import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { GenerateStatementQueryDto } from '../../../modules/types/operation/generate_statement_request.ts';

export class OperationHandler {
  private readonly basePath = 'v1/operations';

  constructor(private readonly kyInstance: KyInstance) {}

  async generateStatement(query: GenerateStatementQueryDto, options?: Options): AsyncResult<Blob> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.blob();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
