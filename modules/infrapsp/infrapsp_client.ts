import ky, { KyInstance } from 'npm:ky@1.2.4';
import { InfraPSPClientConfig } from '../../modules/infrapsp/infrapsp_client_config.ts';
import { MerchantHandler } from '../../modules/infrapsp/handlers/merchant_handler.ts';
import { TransactionHandler } from '../../modules/infrapsp/handlers/transaction_handler.ts';
import { TransferHandler } from '../../modules/infrapsp/handlers/transfer_handler.ts';

export class InfraPSPClient {
  private readonly apiInstance: KyInstance;
  public readonly merchants: MerchantHandler;
  public readonly transactions: TransactionHandler;
  public readonly transfers: TransferHandler;

  constructor(config: InfraPSPClientConfig) {
    this.apiInstance = ky.create({
      prefixUrl: config.baseUrl,
      throwHttpErrors: false,
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
      },
    });

    this.merchants = new MerchantHandler(this.apiInstance);
    this.transactions = new TransactionHandler(this.apiInstance);
    this.transfers = new TransferHandler(this.apiInstance);
  }
}
