// CAIXA (ispb 00360305): accountNumber = operacao (tamanho variavel) + conta zero-preenchida em 15 digitos. Fica so a conta.
export const formatAccountNumber = (params: { ispb?: string; accountNumber?: string }): string =>
  params.ispb === '00360305' ? (params.accountNumber ?? '').slice(-15).replace(/^0+/, '') : params.accountNumber ?? '';
