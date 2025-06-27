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
import { HttpClient } from '../../modules/http/http_client.ts';
import { NotificationBellHandler } from '../../modules/infrapsp/handlers/notification_bell_handler.ts';
import { NotificationTemplateHandler } from '../../modules/infrapsp/handlers/notification_template_handler.ts';
import { NotificationHandler } from '../../modules/infrapsp/handlers/notification_handler.ts';
import { TransactionSplitHandler } from '../../modules/infrapsp/handlers/transaction_split_handler.ts';

export class InfraPSPClient {
  private readonly httpClient: HttpClient;

  public readonly apiKey: ApiKeyHandler;
  public readonly balance: BalanceHandler;
  public readonly checkout: CheckoutHandler;
  public readonly externalAuth: ExternalAuthHandler;
  public readonly feeRule: FeeRuleHandler;
  public readonly impersonate: ImpersonateHandler;
  public readonly invoices: InvoiceHandler;
  public readonly merchants: MerchantHandler;
  public readonly merchantRecords: MerchantRecordHandler;
  public readonly notification: NotificationHandler;
  public readonly notificationBell: NotificationBellHandler;
  public readonly notificationTemplate: NotificationTemplateHandler;
  public readonly payables: PayableHandler;
  public readonly payableSummary: PayableSummaryHandler;
  public readonly preTransactions: PreTransactionHandler;
  public readonly transactions: TransactionHandler;
  public readonly transactionRefunds: TransactionRefundHandler;
  public readonly transactionSplits: TransactionSplitHandler;
  public readonly transfers: TransferHandler;
  public readonly zipCode: ZipCodeHandler;
  public readonly operations: OperationHandler;
  public readonly tiers: TierHandler;
  public readonly webhooks: WebhookHandler;

  constructor(config: InfraPSPClientConfig) {
    const headers: HeadersInit = {};

    if (config.apiKey) headers.Authorization = 'Bearer ' + config.apiKey;

    this.httpClient = new HttpClient(config.baseUrl, { headers });

    this.apiKey = new ApiKeyHandler(this.httpClient);
    this.balance = new BalanceHandler(this.httpClient);
    this.checkout = new CheckoutHandler(this.httpClient);
    this.externalAuth = new ExternalAuthHandler(this.httpClient);
    this.feeRule = new FeeRuleHandler(this.httpClient);
    this.impersonate = new ImpersonateHandler(this.httpClient);
    this.invoices = new InvoiceHandler(this.httpClient);
    this.merchants = new MerchantHandler(this.httpClient);
    this.merchantRecords = new MerchantRecordHandler(this.httpClient);
    this.notification = new NotificationHandler(this.httpClient);
    this.notificationBell = new NotificationBellHandler(this.httpClient);
    this.notificationTemplate = new NotificationTemplateHandler(this.httpClient);
    this.payables = new PayableHandler(this.httpClient);
    this.payableSummary = new PayableSummaryHandler(this.httpClient);
    this.preTransactions = new PreTransactionHandler(this.httpClient);
    this.transactions = new TransactionHandler(this.httpClient);
    this.transactionRefunds = new TransactionRefundHandler(this.httpClient);
    this.transactionSplits = new TransactionSplitHandler(this.httpClient);
    this.transfers = new TransferHandler(this.httpClient);
    this.zipCode = new ZipCodeHandler(this.httpClient);
    this.tiers = new TierHandler(this.httpClient);
    this.operations = new OperationHandler(this.httpClient);
    this.webhooks = new WebhookHandler(this.httpClient);
  }
}
