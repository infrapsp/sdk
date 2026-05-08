/*
ACC	Amex
AUC	Aura
AVC	Avista
BCC	Banescard
BNC	Banese Crédito
BRC	Brasil Card
CAC	Cielo Amex Crédito
CBC	Cabal Crédito
CCD	Calcard Crédito
CSC	Credi-Shop Crédito
CUP	CUP Crédito
CZC	Credz Crédito
DAC	Dacasa Crédito
DBC	Discover Crédito
DCC	Diners Club Crédito
ECC	Elo Crédito
FRC	Fortbrasil Crédito
GCC	Goodcard Crédito
HCC	Hipercard Crédito
JCC	JCB Crédito
MAC	Mais Crédito
MCC	Mastercard Crédito
MXC	Maxifrota Crédito
RCC	Redesplan Crédito
SCC	Sorocred Crédito
SFC	Senff Crédito
SPC	Sem Parar Crédito
TKC	Ticketlog Pós Crédito
VCC	Visa Crédito
VDC	Verdecard Crédito
*/

const paymentArrangements: { [key: string]: string } = {
  'mastercard': 'MCC',
  'visa': 'VCC',
  'elo': 'ECC',
  // 'amex': 'ACC',
  // 'discover': 'DBC',
  // 'diners': 'DCC',
  // 'jcb': 'JCC',
  // 'hipercard': 'HCC',
  // 'cabal': 'CBC',
};

export function mapBrandToPaymentArrangement(brand: string): string | null {
  return paymentArrangements[brand] || null;
}

export function getAllSupportedPaymentArrangements(): string[] {
  return Object.values(paymentArrangements);
}

export function getAllSupportedBrands(): string[] {
  return Object.keys(paymentArrangements);
}

const slcArrangementCodes: { [key: string]: string } = {
  'MCC': '003',
  'VCC': '004',
  'ECC': '008',
};

export function mapArrangementToSlcCode(arrangement: string): string | null {
  return slcArrangementCodes[arrangement] || null;
}
