import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateApiKeyBodyDto } from '../../../modules/types/api_key/create_api_key_request.ts';
import { ApiKeyResponseDto } from '../../../modules/types/api_key/api_key_response.ts';

export class ApiKeyHandler {
  private readonly basePath = 'v1/auth/api-keys';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(body: CreateApiKeyBodyDto, options?: Options): AsyncResult<ApiKeyResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<ApiKeyResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(options?: Options): AsyncResult<ApiKeyResponseDto[]> {
    const url = this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ApiKeyResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }

  async delete(
    id: string,
    options: Options = {},
  ): AsyncResult<void> {
    const url = this.basePath;
    const response = await this.kyInstance.delete(`${url}/${id}`, {
      ...options,
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
