import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { FindFeeRuleQueryDto, RestrictFindFeeRuleQueryDto } from '../../../modules/types/fee_rule/find_fee_rule_request.ts';
import { FeeRuleResponseDto } from '../../../modules/types/fee_rule/fee_rule_response.ts';
import { CreateFeeRuleBodyDto } from '../../../modules/types/fee_rule/create_fee_rule_request.ts';
import { UpdateFeeRuleBodyDto } from '../../../modules/types/fee_rule/update_fee_rule_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class FeeRuleHandler {
  private readonly basePath = '/v1/fee-rules';
  private readonly restrictBasePath = 'v1/admin/fee-rules';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: CreateFeeRuleBodyDto, requestInit: RequestInit = {}): AsyncResult<FeeRuleResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.httpClient.post(url, {
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

  async update(id: string, body: UpdateFeeRuleBodyDto, requestInit: RequestInit = {}): AsyncResult<FeeRuleResponseDto> {
    const url = this.restrictBasePath;

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

  async findMany(query?: Partial<FindFeeRuleQueryDto>, requestInit?: RequestInit & { restrict?: false }): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(query?: Partial<RestrictFindFeeRuleQueryDto>, requestInit?: RequestInit & { restrict?: true }): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(
    query?: Partial<FindFeeRuleQueryDto | RestrictFindFeeRuleQueryDto>,
    requestInit: RequestInit & { restrict?: boolean } = { restrict: false },
  ): AsyncResult<FeeRuleResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const basePath = requestInit.restrict ? this.restrictBasePath : this.basePath;

    const url = query ? basePath + '?' + queryPath : basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
