import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { ZipCodeResponseDto } from '../../../modules/types/zip_code/zip_code_response.ts';

export class ZipCodeHandler {
  private readonly basePath = 'v1/zipcodes';

  constructor(private readonly kyInstance: KyInstance) {}

  async find(zipCode: string, options?: Options): AsyncResult<ZipCodeResponseDto> {
    const url = `${this.basePath}/${zipCode}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<ZipCodeResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
