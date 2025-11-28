import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import type { z } from 'npm:@hono/zod-openapi@1.1.0';
import { FindTransactionChargebackQuerySchema } from '../../../modules/types/transaction_chargeback/find_transaction_chargeback_request.ts';
import { RestrictUpdateTransactionChargebackBodySchema } from '../../../modules/types/transaction_chargeback/update_transaction_chargeback_request.ts';
import { TransactionChargebackResponseDto } from '../../../modules/types/transaction_chargeback/transaction_chargeback_response.ts';
import { UploadChargebackDocumentBodySchema } from '../../../modules/types/transaction_chargeback/upload_chargeback_document_request.ts';

export class TransactionChargebackHandler {
  private readonly basePath = '/v1/transactions';
  private readonly restrictBasePath = '/v1/admin/transactions';

  constructor(private readonly httpClient: HttpClient) {}

  async find(transactionId: string, id: string, requestInit: RequestInit = {}): AsyncResult<TransactionChargebackResponseDto> {
    const url = this.basePath;

    const response = await this.httpClient.get(`${url}/${transactionId}/chargebacks/${id}`, requestInit);

    const data = await response.json();
    const status = response.status;

    return validateResponse({ data, status });
  }

  async findMany(
    query?: z.input<typeof FindTransactionChargebackQuerySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<TransactionChargebackResponseDto[]> {
    const queryPath = new URLSearchParams(query as unknown as Record<string, string>);

    if (query?.createdAtGte) queryPath.set('createdAtGte', new Date(query.createdAtGte).toISOString());
    if (query?.createdAtLte) queryPath.set('createdAtLte', new Date(query.createdAtLte).toISOString());

    const path = '/v1/transaction-chargebacks';

    const url = query ? path + '?' + queryPath : path;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }

  async update(
    transactionId: string,
    id: string,
    body: z.input<typeof RestrictUpdateTransactionChargebackBodySchema>,
    requestInit: RequestInit & { restrict?: true } = { restrict: true },
  ): AsyncResult<TransactionChargebackResponseDto> {
    const url = requestInit.restrict ? this.restrictBasePath : this.basePath;

    const response = await this.httpClient.patch(`${url}/${transactionId}/chargebacks/${id}`, {
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

  async uploadDocument(
    transactionId: string,
    id: string,
    body: z.input<typeof UploadChargebackDocumentBodySchema>,
    requestInit: RequestInit = {},
  ): AsyncResult<undefined> {
    const url = `${this.basePath}/${transactionId}/chargebacks/${id}/document-upload`;

    const formData = new FormData();
    formData.append('doc', body.file);

    const response = await this.httpClient.put(url, {
      ...requestInit,
      body: formData,
      headers: {
        ...requestInit.headers,
      },
    });

    const status = response.status;

    return validateResponse({ data: undefined, status });
  }
}
