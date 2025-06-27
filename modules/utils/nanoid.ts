import { customAlphabet } from 'jsr:@sitnik/nanoid@5.1.5';

export function nanoid(size: number = 21) {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', size)();
}
