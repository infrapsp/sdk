import currencyjs from 'npm:currency.js@2.0.4';

type Any = number | string | Currency;
type Format = (currency?: Currency, opts?: Options) => string;

interface Options {
  symbol?: string;
  separator?: string;
  decimal?: string;
  errorOnInvalid?: boolean;
  precision?: number;
  increment?: number;
  useVedic?: boolean;
  pattern?: string;
  negativePattern?: string;
  format?: Format;
  fromCents?: boolean;
}

interface Currency {
  add(number: Any): Currency;
  subtract(number: Any): Currency;
  multiply(number: Any): Currency;
  divide(number: Any): Currency;
  distribute(count: number): Array<Currency>;
  dollars(): number;
  cents(): number;
  format(opts?: Options | Format): string;
  toString(): string;
  toJSON(): number;
  readonly intValue: number;
  readonly value: number;
}

export const money = (value: Any, opts?: Options): Currency => {
  return currencyjs(value, opts);
};
