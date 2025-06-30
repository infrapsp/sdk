// Taken from: https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator

// Blacklist common values.
const BLACKLIST: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const verifierDigit = (digits: string): number => {
  const numbers: Array<number> = digits
    .split('')
    .map((number) => {
      return parseInt(number, 10);
    });

  const modulus: number = numbers.length + 1;
  const multiplied: Array<number> = numbers.map((number, index) => number * (modulus - index));
  const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11;

  return (mod < 2 ? 0 : 11 - mod);
};

export const isValidCpf = (number: string): boolean => {
  // CPF must have 11 chars
  if (number.length !== 11) {
    return false;
  }

  // CPF can't be blacklisted
  if (BLACKLIST.includes(number)) {
    return false;
  }

  let numbers: string = number.substring(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === number.substring(-2);
};

export function generateCpf(): string {
  const randomDigits = () => Math.floor(Math.random() * 9);

  const cpfArray = Array.from({ length: 9 }, () => randomDigits());

  const calculateDigit = (cpfArray: number[], factor: number) => {
    const total = cpfArray.reduce((sum, digit) => sum + digit * factor--, 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cpfArray, 10);
  const secondDigit = calculateDigit([...cpfArray, firstDigit], 11);

  return [...cpfArray, firstDigit, secondDigit].join('');
}

export function formatCpf(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function maskCpf(cpf: string): string {
  return `***${cpf.slice(3, 6)}${cpf.slice(6, 9)}**`;
}
