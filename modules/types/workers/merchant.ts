import { BaseWorkerBodySchema } from '../../../modules/types/workers/base.ts';
import { CreateMerchantOnProviderBodySchema } from '../../../modules/types/actions/merchant.ts';

export const CreateMerchantOnProviderWorkerBodySchema = BaseWorkerBodySchema.and(CreateMerchantOnProviderBodySchema);
