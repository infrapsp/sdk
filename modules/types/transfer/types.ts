import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum TransferMethod {
  PIX = 'pix',
  INTER = 'inter',
}

export enum TransferStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  FAILED = 'failed',
  FINISHED = 'finished',
}

export type TransferPixMethodDestination = { pixKey: string };
export type TransferInterMethodDestination = { merchantId: string };

export type TransferMethodDestination = EmptyObject | TransferPixMethodDestination | TransferInterMethodDestination;
