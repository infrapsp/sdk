import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransactionRefundBodyDto } from '../../../modules/types/transaction_refund/create_transaction_refund_request.ts';
import { TransactionRefundResponseDto } from '../../../modules/types/transaction_refund/transaction_refund_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';

export class TransactionRefundHandler {
  private readonly basePath = '/v1/transactions';

  constructor(private readonly httpClient: HttpClient) {}

  async create(
    transactionId: string,
    body: CreateTransactionRefundBodyDto,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionRefundResponseDto> {
    const url = `${this.basePath}/${transactionId}/refunds`;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
