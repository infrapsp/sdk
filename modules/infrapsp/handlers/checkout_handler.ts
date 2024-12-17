import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import { CreateTransactionCheckoutBodySchema } from '../../../modules/types/transaction/create_transaction_request.ts';
import { TransactionCheckoutResponseDto } from '../../../modules/types/transaction/transaction_checkout_response.ts';
import { PreTransactionCheckoutResponseDto } from '../../../modules/types/pre_transaction/pre_transaction_checkout_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'https://deno.land/x/zod@v3.24.1/mod.ts';

export class CheckoutHandler {
  private readonly basePath = '/v1/checkout';

  constructor(private readonly httpClient: HttpClient) {}

  async createTransaction(
    preTransactionId: string,
    body: z.input<typeof CreateTransactionCheckoutBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionCheckoutResponseDto> {
    const url = `${this.basePath}/pre-transactions/${preTransactionId}/transactions`;

    const response = await this.httpClient.post(url, {
      ...requestInit,
      body: JSON.stringify(body),
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findPreTransaction(preTransactionId: string, requestInit: RequestInit = {}): AsyncResult<PreTransactionCheckoutResponseDto[]> {
    const url = `${this.basePath}/pre-transactions/${preTransactionId}`;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
