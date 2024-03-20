import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum TransferMethod {
  PIX = 'pix',
}

export enum TransferStatus {
  CREATED = 'created',
  FAILED = 'failed',
  FINISHED = 'finished',
}

export type TransferMethodDestination = EmptyObject | { merchantId: string } | { pixKey: string };
