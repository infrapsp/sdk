import { DocumentType, Gender } from '../../../modules/types/merchant/types.ts';
import { Address } from '../../../modules/types/address/types.ts';

export enum PreTransactionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

export type PreTransactionCustomer = {
  companyName?: string;
  personName: string;
  documentType: DocumentType;
  documentNumber: string;
  birthdate?: Date;
  gender: Gender;
  phones: string[];
  address: Address;
  email: string;
};

export type PreTransactionBilling = {
  companyName?: string;
  personName: string;
  documentType: DocumentType;
  documentNumber: string;
  address: Address;
};

export type PreTransactionShipping = {
  amount: number;
  address: Address;
  description: string;
  maxDeliveryDate?: Date;
  estimatedDeliveryDate?: Date;
  recipientName: string;
  recipientPhones: string[];
};

export type PreTransactionItem = {
  description: string;
  amount: number;
  quantity: number;
  category: string;
  code: string;
};
