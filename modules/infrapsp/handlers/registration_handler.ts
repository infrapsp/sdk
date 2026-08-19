import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { RegistrationResponseDto } from '../../../modules/types/registration/registration_response.ts';
import { FindRegistrationQuerySchema } from '../../../modules/types/registration/find_registration_request.ts';
import { UpdateRegistrationBodySchema } from '../../../modules/types/registration/update_registration_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.4.0';
import { isError } from '../../../modules/errors/is_error.ts';

export class RegistrationHandler {
  private readonly basePath = '/v1/admin/merchants/registrations';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(query?: z.input<typeof FindRegistrationQuerySchema>, requestInit: RequestInit = {}): AsyncResult<RegistrationResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    id: string,
    body: z.input<typeof UpdateRegistrationBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<RegistrationResponseDto> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.patch(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    if (isError(response)) return response;

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
