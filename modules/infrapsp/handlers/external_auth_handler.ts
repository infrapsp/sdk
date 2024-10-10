import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ExternalAuthMerchantResponseDto } from '../../../modules/types/external_auth/external_auth_merchant_response.ts';
import { CreateRegistrationBodyDto } from '../../../modules/types/registration/create_registration_request.ts';
import { RegistrationResponseDto } from '../../../modules/types/registration/registration_response.ts';
import { FindExternalAuthQueryDto } from '../../../modules/types/external_auth/find_external_auth_request.ts';
import { ExternalAuthUserResponseDto } from '../../../modules/types/external_auth/external_auth_response.ts';
import { CreateExternalAuthBodyDto } from '../../../modules/types/external_auth/create_external_auth_request.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class ExternalAuthHandler {
  private readonly basePath = '/v1/auth/external-auth';

  constructor(private readonly httpClient: HttpClient) {}

  async createRegistration(body: CreateRegistrationBodyDto, requestInit: RequestInit = {}): AsyncResult<RegistrationResponseDto> {
    const url = `${this.basePath}/registrations`;

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

  async findManyMerchant(requestInit: RequestInit = {}): AsyncResult<ExternalAuthMerchantResponseDto[]> {
    const url = `${this.basePath}/merchants`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async findMany(query: FindExternalAuthQueryDto, requestInit: RequestInit = {}): AsyncResult<ExternalAuthUserResponseDto> {
    const queryPath = new URLSearchParams(query);

    const url = `${this.basePath}?${queryPath}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async create(body: CreateExternalAuthBodyDto, requestInit: RequestInit = {}): AsyncResult<ExternalAuthUserResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async delete(id: string, requestInit: RequestInit = {}): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}`;

    const response = await this.httpClient.delete(url, requestInit);

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }

  async replyInvite(id: string, hasAccepted: boolean, requestInit: RequestInit = {}): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}/invitation`;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify({ hasAccepted }),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
