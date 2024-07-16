import { EmptyObject } from '../../../modules/types/base/types.ts';
import { DocumentType } from '../../../modules/types/merchant/types.ts';

export enum TransferMethod {
  PIX = 'pix',
  INTER = 'inter',
}

export enum TransferStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  FAILED = 'failed',
  COMPLETED = 'completed',
}

export type TransferPixMethodDestination = {
  pixKey: string;
  name?: string;
  bank?: string;
  ispb?: string;
  documentNumber?: string;
  accountType?: string;
  documentType?: DocumentType;
};

export type TransferInterMethodDestination = { merchantId: string };

export type TransferMethodDestination = EmptyObject | TransferPixMethodDestination | TransferInterMethodDestination;
