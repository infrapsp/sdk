import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { FindFeeRuleQueryDto, RestrictFindFeeRuleQueryDto } from '../../../modules/types/fee_rule/find_fee_rule_request.ts';
import { FeeRuleResponseDto } from '../../../modules/types/fee_rule/fee_rule_response.ts';
import { CreateFeeRuleBodyDto } from '../../../modules/types/fee_rule/create_fee_rule_request.ts';
import { UpdateFeeRuleBodyDto } from '../../../modules/types/fee_rule/update_fee_rule_request.ts';

export class FeeRuleHandler {
  private readonly basePath = 'v1/fee-rules';
  private readonly restrictBasePath = 'v1/admin/fee-rules';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateFeeRuleBodyDto, options?: Options): AsyncResult<FeeRuleResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      json: body,
    });

    const data = await response.json<FeeRuleResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async update(id: string, body: UpdateFeeRuleBodyDto, options?: Options): AsyncResult<FeeRuleResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.kyInstance.patch(`${url}/${id}`, {
      ...options,
      json: body,
    });

    const data = await response.json<FeeRuleResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindFeeRuleQueryDto>, options?: Options & { restrict?: false }): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(query?: Partial<RestrictFindFeeRuleQueryDto>, options?: Options & { restrict?: true }): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(
    query?: Partial<FindFeeRuleQueryDto | RestrictFindFeeRuleQueryDto>,
    options: Options & { restrict?: boolean } = { restrict: false },
  ): AsyncResult<FeeRuleResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const basePath = options.restrict ? this.restrictBasePath : this.basePath;

    const url = query ? basePath + '?' + queryPath : basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<FeeRuleResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
