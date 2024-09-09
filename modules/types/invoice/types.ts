import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum InvoiceStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  ISSUED = 'issued',
  NOT_ISSUED = 'not_issued',
  CANCELED = 'canceled',
}

export type InvoiceIssuedData = EmptyObject | {
  number?: string;
  url?: string;
  checkCode?: string;
};
