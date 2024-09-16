import { KyInstance, Options } from 'npm:ky@1.2.4';
import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransactionCheckoutBodyDto } from '../../../modules/types/transaction/create_transaction_request.ts';
import { TransactionCheckoutResponseDto } from '../../../modules/types/transaction/transaction_checkout_response.ts';
import { PreTransactionCheckoutResponseDto } from '../../../modules/types/pre_transaction/pre_transaction_checkout_response.ts';

export class CheckoutHandler {
  private readonly basePath = 'v1/checkout';

  constructor(private readonly kyInstance: KyInstance) {}

  async createTransaction(
    preTransactionId: string,
    body: CreateTransactionCheckoutBodyDto,
    options?: Options,
  ): AsyncResult<TransactionCheckoutResponseDto> {
    const url = `${this.basePath}/pre-transactions/${preTransactionId}/transactions`;

    const response = await this.kyInstance.post(url, {
      ...options,
      body: JSON.stringify(body),
    });

    const data = await response.json<TransactionCheckoutResponseDto>();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findPreTransaction(preTransactionId: string, options?: Options): AsyncResult<PreTransactionCheckoutResponseDto[]> {
    const url = `${this.basePath}/pre-transactions/${preTransactionId}`;

    const response = await this.kyInstance.get(url, options);

    const data = await response.json<PreTransactionCheckoutResponseDto[]>();

    return validateResponse({ data, status: response.status });
  }
}
