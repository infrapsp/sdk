// Taken from: https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator

// Blacklist common values.
const BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const verifierDigit = (digits: string): number => {
  let index: number = 2;
  const reverse: Array<number> = digits.split('').reduce((buffer, number) => {
    return [parseInt(number, 10)].concat(buffer);
  }, [] as number[]);

  const sum: number = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod: number = sum % 11;
  return (mod < 2 ? 0 : 11 - mod);
};

export const isValidCnpj = (number: string): boolean => {
  // CNPJ must be defined
  if (!number) {
    return false;
  }

  // CNPJ must have 14 chars
  if (number.length !== 14) {
    return false;
  }

  // CNPJ can't be blacklisted
  if (BLACKLIST.includes(number)) {
    return false;
  }

  let numbers: string = number.substring(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === number.substring(-2);
};
