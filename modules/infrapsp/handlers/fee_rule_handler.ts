import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { FindFeeRuleQueryDto } from '../../../modules/types/fee_rule/find_fee_rule_request.ts';
import { FeeRuleResponseDto } from '../../../modules/types/fee_rule/fee_rule_response.ts';

export class FeeRuleHandler {
  private readonly basePath = 'v1/fee-rules';

  constructor(private readonly kyInstance: KyInstance) {}

  async findMany(query?: Partial<FindFeeRuleQueryDto>, options?: Options): AsyncResult<FeeRuleResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<FeeRuleResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
