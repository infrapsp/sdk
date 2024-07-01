import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransactionRefundBodyDto } from '../../../modules/types/transaction_refund/create_transaction_refund_request.ts';
import { TransactionRefundResponseDto } from '../../../modules/types/transaction_refund/transaction_refund_response.ts';

export class TransactionRefundHandler {
  private readonly basePath = 'v1/transactions';

  constructor(private readonly kyInstance: KyInstance) {}

  async create(transactionId: string, body: CreateTransactionRefundBodyDto, options?: Options): AsyncResult<TransactionRefundResponseDto> {
    const url = `${this.basePath}/${transactionId}/refunds`;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<TransactionRefundResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }
}
