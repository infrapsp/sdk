import { customAlphabet } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts';

export function nanoid(size: number = 21) {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', size)();
}
