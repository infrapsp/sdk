import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ImpersonateBodySchema } from '../../../modules/types/external_auth/impersonate_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
export class ImpersonateHandler {
  private readonly basePath = '/v1/auth/impersonate';

  constructor(private readonly httpClient: HttpClient) {}

  async impersonate(
    body: z.input<typeof ImpersonateBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.httpClient.post(`${url}`, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return validateResponse({ data: undefined, status: response.status });
    } else {
      const data = await response.json();

      const status = response.status;

      return validateResponse({ data, status });
    }
  }

  async removeImpersonate(
    requestInit: RequestInit = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.httpClient.delete(`${url}`, {
      ...requestInit,
    });

    if (response.status >= 200 && response.status < 300) {
      return validateResponse({ data: undefined, status: response.status });
    } else {
      const data = await response.json();

      const status = response.status;

      return validateResponse({ data, status });
    }
  }

  async findImpersonate(
    requestInit: RequestInit = {},
  ): AsyncResult<{ merchantId: string | null }> {
    const url = this.basePath;
    const response = await this.httpClient.get(`${url}`, {
      ...requestInit,
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
