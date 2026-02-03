// AML Types

import { EmptyObject } from '../../../modules/types/base/types.ts';

export enum DatasourceEngine {
  MYSQL = 'mysql',
  POSTGRESQL = 'postgresql',
  YENTE = 'yente',
}

export type DatabaseConfig = {
  dsn: string;
};
export type YenteConfig = {
  baseUrl: string;
  threshold?: number;
  cutoff?: number;
  algorithm?: string;
};

export type DatasourceConfig = EmptyObject | DatabaseConfig | YenteConfig;

export enum AnalysisStatus {
  APPROVED = 'approved',
  MANUAL_REVIEW = 'manual_review',
  REJECTED = 'rejected',
}

export enum AnalysisRiskLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum AmlEntity {
  TRANSACTION = 'transaction',
  TRANSFER = 'transfer',
}

// Threshold settings structure
export type ThresholdSetting = {
  riskLevel: AnalysisRiskLevel;
  threshold: number;
  status: AnalysisStatus;
  requiresReview: boolean;
};
