import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { FindFeeRuleQuerySchema, RestrictFindFeeRuleQuerySchema } from '../../../modules/types/fee_rule/find_fee_rule_request.ts';
import { FeeRuleResponseDto } from '../../../modules/types/fee_rule/fee_rule_response.ts';
import { CreateFeeRuleBodySchema } from '../../../modules/types/fee_rule/create_fee_rule_request.ts';
import { UpdateFeeRuleBodySchema } from '../../../modules/types/fee_rule/update_fee_rule_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@0.18.3';

export class FeeRuleHandler {
  private readonly basePath = '/v1/fee-rules';
  private readonly restrictBasePath = '/v1/admin/fee-rules';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreateFeeRuleBodySchema>, requestInit: RequestInit = {}): AsyncResult<FeeRuleResponseDto> {
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

  async update(id: string, body: z.input<typeof UpdateFeeRuleBodySchema>, requestInit: RequestInit = {}): AsyncResult<FeeRuleResponseDto> {
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

  async findMany(query?: z.input<typeof FindFeeRuleQuerySchema>, requestInit?: RequestInit & { restrict?: false }): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(
    query?: z.input<typeof RestrictFindFeeRuleQuerySchema>,
    requestInit?: RequestInit & { restrict?: true },
  ): AsyncResult<FeeRuleResponseDto[]>;
  async findMany(
    query?: z.input<typeof FindFeeRuleQuerySchema> | z.input<typeof RestrictFindFeeRuleQuerySchema>,
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
