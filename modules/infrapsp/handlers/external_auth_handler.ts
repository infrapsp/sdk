import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ExternalAuthMerchantResponseDto } from '../../../modules/types/external_auth/external_auth_merchant_response.ts';
import { CreateRegistrationBodyDto } from '../../../modules/types/registration/create_registration_request.ts';
import { RegistrationResponseDto } from '../../../modules/types/registration/registration_response.ts';
import { FindExternalAuthQueryDto } from '../../../modules/types/external_auth/find_external_auth_request.ts';
import { ExternalAuthUserResponseDto } from '../../../modules/types/external_auth/external_auth_response.ts';
import { CreateExternalAuthBodyDto } from '../../../modules/types/external_auth/create_external_auth_request.ts';

export class ExternalAuthHandler {
  private readonly basePath = 'v1/auth/external-auth';

  constructor(private readonly kyInstance: KyInstance) {}

  async createRegistration(body: CreateRegistrationBodyDto, options?: Options): AsyncResult<RegistrationResponseDto> {
    const url = `${this.basePath}/registrations`;

    const response = await this.kyInstance.post(url, {
      ...options,
      json: body,
    });

    const data = await response.json<RegistrationResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findManyMerchant(options?: Options): AsyncResult<ExternalAuthMerchantResponseDto[]> {
    const url = `${this.basePath}/merchants`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ExternalAuthMerchantResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async findMany(query: FindExternalAuthQueryDto, options?: Options): AsyncResult<ExternalAuthUserResponseDto> {
    const queryPath = new URLSearchParams(query);

    const url = `${this.basePath}?${queryPath}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ExternalAuthUserResponseDto>();

    return validateResponse({ data, status: response.status });
  }

  async create(body: CreateExternalAuthBodyDto, options?: Options): AsyncResult<ExternalAuthUserResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<ExternalAuthUserResponseDto>();

    return validateResponse({ data, status: response.status });
  }

  async delete(id: string, options?: Options): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}`;

    const response = await this.kyInstance.delete(url, options);

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }

  async replyInvite(id: string, hasAccepted: boolean, options?: Options): AsyncResult<undefined> {
    const url = `${this.basePath}/${id}/invitation`;

    const response = await this.kyInstance.post(url, {
      ...options,
      json: JSON.stringify({ hasAccepted }),
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
