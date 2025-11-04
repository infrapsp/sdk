export enum TransactionChargebackStatus {
  PENDING = 'pending',
  WAITING_RESPONSE = 'waiting_response',
  UNDER_REVIEW = 'under_review',
  DISPUTING = 'disputing',
  WON = 'won',
  LOST = 'lost',
  CANCELED = 'canceled',
}

export enum TransactionChargebackRequiredDocument {
  TRANSACTION_RECEIPT = 'TRANSACTION_RECEIPT', // cópia do comprovante da transação
  SIGNED_RECEIPT = 'SIGNED_RECEIPT', // comprovante assinado quando não houve validação de senha

  LIQUIDATION_PROOF = 'LIQUIDATION_PROOF', // recibo que comprova a transação ou liquidação da transação dentro do prazo exigido
  CURRENCY_PROOF = 'CURRENCY_PROOF', // recibo que comprova a transação ou que indica que a moeda da transação está correta
  ACCOUNT_NUMBER_PROOF = 'ACCOUNT_NUMBER_PROOF', // recibo que comprova a transação ou que comprova que o numero da conta foi processado corretamente

  CREDIT_ISSUED_PROOF = 'CREDIT_ISSUED_PROOF', // prova de que comerciante processou crédito/estorno para o titular do cartão
  CONTRACT_PROOF = 'CONTRACT_PROOF', // prova de contrato firmado entre comerciante e portador pelos serviços
  SERVICE_PROOF = 'SERVICE_PROOF', // prova de que o titular do cartão está usufruindo do serviço

  DELIVERY_PROOF = 'DELIVERY_PROOF', // documento de entrega ou prestação de serviço
  RETURN_REPAIR_POLICY = 'RETURN_REPAIR_POLICY', // política de troca/cancelamento/reparo
  EXPLANATION_LETTER = 'EXPLANATION_LETTER', // carta explicando o ocorrido
  REPAIR_PROOF = 'REPAIR_PROOF', // evidência de reparo ou defeito do produto
  NON_CANCELLATION_PROOF = 'NON_CANCELLATION_PROOF', // prova de que cancelamento foi iniciado pelo estabelecimento e não foi confirmado pelo titular do cartão
}

export enum TransactionChargebackReason {
  FRAUD = 'fraud', // transação fraudulenta
  COMMERCIAL_DISAGREEMENT = 'commercial_disagreement', // desacordo comercial
  PROCESSING_ERROR = 'processing_error', // erro de processamento
  AUTHORIZATION = 'authorization', // autorização
  UNKNOWN = 'unknown', // desconhecido
}
