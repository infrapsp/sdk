export enum UnitReceivableRegistryStatus {
  WAITING_CREATE = 'waiting_create',
  WAITING_UPDATE = 'waiting_update',
  WAITING_LIQUIDATE = 'waiting_liquidate',
  CREATED = 'created',
  UPDATED = 'updated',
  LIQUIDATED = 'liquidated',
}

export enum UnitReceivableSlcStatus {
  WAITING_ACTION = 'waiting_action',
  WAITING_INFORM = 'waiting_inform',
  INFORMED = 'informed',
  NOT_INFORMED = 'not_informed',
}
