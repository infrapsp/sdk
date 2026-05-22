import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';
import { PolicyViolationResponseSchema } from '../../../modules/types/policy_violation/policy_violation_response.ts';
import { RestrictFindPolicyViolationQuerySchema } from '../../../modules/types/policy_violation/find_policy_violation_request.ts';

export class PolicyViolationHandler {
  private readonly basePath = '/v1/policy-violations';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(requestInit: RequestInit = {}): AsyncResult<z.infer<typeof PolicyViolationResponseSchema>[]> {
    const response = await this.httpClient.get(this.basePath, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async restrictFindMany(query: z.input<typeof RestrictFindPolicyViolationQuerySchema>, requestInit: RequestInit = {}): AsyncResult<z.infer<typeof PolicyViolationResponseSchema>[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);
    const url = `/v1/admin/policy-violations?${queryPath}`;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
