import { crypto } from 'https://deno.land/std@0.223.0/crypto/crypto.ts';
import { decodeHex } from 'https://deno.land/std@0.223.0/encoding/hex.ts';
import { catcherAsync } from '../../modules/errors/catcher.ts';
import { CommonError } from '../../modules/errors/common_error.ts';
import { AsyncResult } from '../../modules/types/result.ts';
import { isError } from '../../modules/errors/is_error.ts';

/* Decrypts an AES-GCM encrypted message in hexadecimal format */
export async function aesDecrypt(hexKey: string, hexCipher: string): AsyncResult<string> {
  const rawKey = new Uint8Array(decodeHex(hexKey));

  const key = await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  let encrypted = new Uint8Array(decodeHex(hexCipher));

  const iv = encrypted.slice(0, 12);
  encrypted = encrypted.slice(12);
  const decrypted = await catcherAsync(() =>
    crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted,
    ), (e) => new CommonError({ message: 'Failed to decrypt the message', internalMessage: e.message, status: 500, stack: e.stack }));

  if (isError(decrypted)) return decrypted;
  return new TextDecoder().decode(decrypted);
}
