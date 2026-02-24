import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { FindFeeProposalQuerySchema } from '../../../modules/types/fee_proposal/find_fee_proposal_request.ts';
import { isError } from '../../../modules/errors/is_error.ts';
import { FeeProposalResponseDto } from '../../../modules/types/fee_proposal/fee_proposal_response.ts';
import { RestrictCreateFeeProposalBodySchema } from '../../../modules/types/fee_proposal/create_fee_proposal_request.ts';
import { UpdateFeeProposalBodySchema } from '../../../modules/types/fee_proposal/update_fee_proposal_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';

export class FeeProposalHandler {
  private readonly basePath = '/v1/fee-proposals';
  private readonly restrictBasePath = '/v1/admin/fee-proposals';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof RestrictCreateFeeProposalBodySchema>, requestInit: RequestInit = {}): AsyncResult<FeeProposalResponseDto> {
    const url = this.restrictBasePath;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async update(id: string, body: z.input<typeof UpdateFeeProposalBodySchema>, requestInit: RequestInit = {}): AsyncResult<FeeProposalResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.patch(`${url}/${id}`, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (isError(response)) return response;

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async delete(id: string, requestInit: RequestInit = {}): AsyncResult<void> {
    const url = this.basePath;

    const response = await this.httpClient.delete(`${url}/${id}`, requestInit);

    if (isError(response)) return response;

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }

  async findMany(query?: z.input<typeof FindFeeProposalQuerySchema>, requestInit: RequestInit = {}): AsyncResult<FeeProposalResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
