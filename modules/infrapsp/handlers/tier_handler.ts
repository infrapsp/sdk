import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { TierResponseDto } from '../../../modules/types/tier/tier_response.ts';
import { CreateTierBodySchema } from '../../../modules/types/tier/create_tier_request.ts';
import { UpdateTierBodySchema } from '../../../modules/types/tier/update_tier_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type z from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export class TierHandler {
  private readonly basePath = '/v1/tiers';
  private readonly restrictBasePath = '/v1/admin/tiers';

  constructor(private readonly httpClient: HttpClient) {}

  async create(body: z.input<typeof CreateTierBodySchema>, requestInit: RequestInit = {}): AsyncResult<TierResponseDto> {
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

  async update(id: string, body: z.input<typeof UpdateTierBodySchema>, requestInit: RequestInit = {}): AsyncResult<TierResponseDto> {
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

  async findMany(requestInit: RequestInit = {}): AsyncResult<TierResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async find(id: string, requestInit: RequestInit = {}): AsyncResult<TierResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(`${url}/${id}`, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
