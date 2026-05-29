export enum SlcParticipantRole {
  SCHEME_HOLDER = 'scheme_holder',
  ACQUIRER = 'acquirer',
  DOMICILE_INSTITUTION = 'domicile_institution',
  ISSUER = 'issuer',
  SETTLEMENT_BANK = 'settlement_bank',
  SUB_ACQUIRER = 'sub_acquirer',
  SUB_ACQUIRER_RECEIVER = 'sub_acquirer_receiver',
}

/**
 * Sparse JSONB shape stored in core.slc_participant.roles.
 * Only roles assigned to the participant appear as keys (always `true`).
 * Absent key ⇔ role not assigned.
 */
export type SlcParticipantRoles = Partial<Record<SlcParticipantRole, true>>;
