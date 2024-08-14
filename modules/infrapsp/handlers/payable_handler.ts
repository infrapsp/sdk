import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { PayableResponseDto } from '../../../modules/types/payable/payable_response.ts';
import { FindPayableQueryDto } from '../../../modules/types/payable/find_payable_request.ts';

export class PayableHandler {
  private readonly basePath = 'v1/payables';

  constructor(private readonly kyInstance: KyInstance) {}

  async find(id: string, options?: Options): AsyncResult<PayableResponseDto> {
    const url = this.basePath;

    const response = await this.kyInstance.get(`${url}/${id}`, options);

    const data = await response.json<PayableResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(query?: Partial<FindPayableQueryDto>, options?: Options): AsyncResult<PayableResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    const url = query ? this.basePath + '?' + queryPath : this.basePath;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<PayableResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
