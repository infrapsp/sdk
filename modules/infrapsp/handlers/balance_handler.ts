import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { BalanceResponseDto } from '../../../modules/types/balance/balance_response.ts';

export class BalanceHandler {
  private readonly basePath = 'v1/balance';

  constructor(private readonly kyInstance: KyInstance) {}

  async find(options?: Options): AsyncResult<BalanceResponseDto> {
    const url = '/';

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<BalanceResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
