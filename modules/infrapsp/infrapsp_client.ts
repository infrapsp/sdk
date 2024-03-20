import ky, { KyInstance } from 'npm:ky@1.2.0';
import { InfraPSPClientConfig } from '../../modules/infrapsp/infrapsp_client_config.ts';
import { MerchantsHandler } from '../../modules/infrapsp/handlers/merchants_handler.ts';

export class InfraPSPClient {
  private readonly instance: KyInstance;
  public readonly merchants: MerchantsHandler;

  constructor(config: InfraPSPClientConfig) {
    this.instance = ky.create({
      prefixUrl: config.baseUrl,
      throwHttpErrors: false,
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
      },
    });

    this.merchants = new MerchantsHandler(this.instance);
  }
}
