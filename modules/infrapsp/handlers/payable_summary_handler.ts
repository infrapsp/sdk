import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { PayableSummaryResponseDto } from '../../../modules/types/payable_summary/payable_summary_response.ts';
import { FindPayableSummaryQueryDto } from '../../../modules/types/payable_summary/find_payable_summary_request.ts';

export class PayableSummaryHandler {
  private readonly basePath = 'v1/payable-summary';

  constructor(private readonly kyInstance: KyInstance) {}

  async findMany(query?: Partial<FindPayableSummaryQueryDto>, options?: Options): AsyncResult<PayableSummaryResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<PayableSummaryResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
