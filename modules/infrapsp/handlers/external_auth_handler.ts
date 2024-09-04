import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ExternalAuthMerchantResponseDto } from '../../../modules/types/external_auth/external_auth_merchant_response.ts';
import { CreateRegistrationBodyDto } from '../../../modules/types/registration/create_registration_request.ts';
import { RegistrationResponseDto } from '../../../modules/types/registration/registration_response.ts';

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

  async findMany(options?: Options): AsyncResult<ExternalAuthMerchantResponseDto[]> {
    const url = `${this.basePath}/merchants`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ExternalAuthMerchantResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
