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
import { ZipCodeHandler } from '../../modules/infrapsp/handlers/zip_code_handler.ts';
import { InvoiceHandler } from '../../modules/infrapsp/handlers/invoice_handler.ts';
import { FeeRuleHandler } from '../../modules/infrapsp/handlers/fee_rule_handler.ts';
import { OperationHandler } from '../../modules/infrapsp/handlers/operation_handler.ts';
import { TierHandler } from '../../modules/infrapsp/handlers/tier_handler.ts';
import { WebhookHandler } from '../../modules/infrapsp/handlers/webhook_handler.ts';
import { CheckoutHandler } from '../../modules/infrapsp/handlers/checkout_handler.ts';
import { PreTransactionHandler } from '../../modules/infrapsp/handlers/pre_transaction_handler.ts';
import { MerchantRecordHandler } from '../../modules/infrapsp/handlers/merchant_record_handler.ts';

export class InfraPSPClient {
  private readonly apiInstance: KyInstance;

  public readonly apiKey: ApiKeyHandler;
  public readonly balance: BalanceHandler;
  public readonly checkout: CheckoutHandler;
  public readonly externalAuth: ExternalAuthHandler;
  public readonly feeRule: FeeRuleHandler;
  public readonly impersonate: ImpersonateHandler;
  public readonly invoices: InvoiceHandler;
  public readonly merchants: MerchantHandler;
  public readonly merchantRecords: MerchantRecordHandler;
  public readonly payables: PayableHandler;
  public readonly payableSummary: PayableSummaryHandler;
  public readonly preTransactions: PreTransactionHandler;
  public readonly transactions: TransactionHandler;
  public readonly transactionRefunds: TransactionRefundHandler;
  public readonly transfers: TransferHandler;
  public readonly zipCode: ZipCodeHandler;
  public readonly operations: OperationHandler;
  public readonly tiers: TierHandler;
  public readonly webhooks: WebhookHandler;

  constructor(config: InfraPSPClientConfig) {
    this.apiInstance = ky.create({
      prefixUrl: config.baseUrl,
      throwHttpErrors: false,
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
      },
    });

    this.apiKey = new ApiKeyHandler(this.apiInstance);
    this.balance = new BalanceHandler(this.apiInstance);
    this.checkout = new CheckoutHandler(this.apiInstance);
    this.externalAuth = new ExternalAuthHandler(this.apiInstance);
    this.feeRule = new FeeRuleHandler(this.apiInstance);
    this.impersonate = new ImpersonateHandler(this.apiInstance);
    this.invoices = new InvoiceHandler(this.apiInstance);
    this.merchants = new MerchantHandler(this.apiInstance);
    this.merchantRecords = new MerchantRecordHandler(this.apiInstance);
    this.payables = new PayableHandler(this.apiInstance);
    this.payableSummary = new PayableSummaryHandler(this.apiInstance);
    this.preTransactions = new PreTransactionHandler(this.apiInstance);
    this.transactions = new TransactionHandler(this.apiInstance);
    this.transactionRefunds = new TransactionRefundHandler(this.apiInstance);
    this.transfers = new TransferHandler(this.apiInstance);
    this.zipCode = new ZipCodeHandler(this.apiInstance);
    this.tiers = new TierHandler(this.apiInstance);
    this.operations = new OperationHandler(this.apiInstance);
    this.webhooks = new WebhookHandler(this.apiInstance);
  }
}
