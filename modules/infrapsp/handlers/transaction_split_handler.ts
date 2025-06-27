import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { TransactionSplitDetailResponseDto } from '../../../modules/types/transaction_split/transaction_split_response.ts';

export class TransactionSplitHandler {
  private readonly basePath = '/v1/transactions';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(
    transactionId: string,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionSplitDetailResponseDto[]> {
    const url = `${this.basePath}/${transactionId}/splits`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
