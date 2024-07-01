import ky, { KyInstance } from 'npm:ky@1.2.4';
import { InfraPSPClientConfig } from '../../modules/infrapsp/infrapsp_client_config.ts';
import { MerchantHandler } from '../../modules/infrapsp/handlers/merchant_handler.ts';
import { TransactionHandler } from '../../modules/infrapsp/handlers/transaction_handler.ts';
import { TransferHandler } from '../../modules/infrapsp/handlers/transfer_handler.ts';
import { ApiKeyHandler } from '../../modules/infrapsp/handlers/api_key_handler.ts';
import { ExternalAuthHandler } from '../../modules/infrapsp/handlers/external_auth_handler.ts';
import { ImpersonateHandler } from '../../modules/infrapsp/handlers/impersonate_handler.ts';
import { BalanceHandler } from '../../modules/infrapsp/handlers/balance_handler.ts';
import { PayableHandler } from '../../modules/infrapsp/handlers/payable_handler.ts';
import { PayableSummaryHandler } from '../../modules/infrapsp/handlers/payable_summary_handler.ts';
import { TransactionRefundHandler } from '../../modules/infrapsp/handlers/transaction_refund_handler.ts';

export class InfraPSPClient {
  private readonly apiInstance: KyInstance;

  public readonly apiKey: ApiKeyHandler;
  public readonly externalAuth: ExternalAuthHandler;
  public readonly merchants: MerchantHandler;
  public readonly payables: PayableHandler;
  public readonly payableSummary: PayableSummaryHandler;
  public readonly impersonate: ImpersonateHandler;
  public readonly transactions: TransactionHandler;
  public readonly transactionRefunds: TransactionRefundHandler;
  public readonly transfers: TransferHandler;
  public readonly balance: BalanceHandler;

  constructor(config: InfraPSPClientConfig) {
    this.apiInstance = ky.create({
      prefixUrl: config.baseUrl,
      throwHttpErrors: false,
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
      },
    });

    this.apiKey = new ApiKeyHandler(this.apiInstance);
    this.externalAuth = new ExternalAuthHandler(this.apiInstance);
    this.merchants = new MerchantHandler(this.apiInstance);
    this.payables = new PayableHandler(this.apiInstance);
    this.payableSummary = new PayableSummaryHandler(this.apiInstance);
    this.impersonate = new ImpersonateHandler(this.apiInstance);
    this.transactions = new TransactionHandler(this.apiInstance);
    this.transactionRefunds = new TransactionRefundHandler(this.apiInstance);
    this.transfers = new TransferHandler(this.apiInstance);
    this.balance = new BalanceHandler(this.apiInstance);
  }
}
