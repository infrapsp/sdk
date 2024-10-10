import { crypto } from 'jsr:@std/crypto@1.0.3';

export function md5(input: Record<string, unknown>): Promise<string> {
  const object = deepSort(input);

  return hashMD5(JSON.stringify(object));
}

function isObject<T = object>(value: unknown): value is object {
  return value != null && (typeof value === 'object' || typeof value === 'function') && !Array.isArray(value);
}

async function hashMD5(text: string): Promise<string> {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('MD5', new TextEncoder().encode(text)),
    ),
    (b) => b.toString(16).padStart(2, '0'),
  ).join('');
}

function deepSort(input: Record<string, unknown>): Record<string, unknown> {
  const object = Object.entries(input)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .reduce(
      (previous, [key, value]) => ({
        ...previous,
        [key]: IsValidObject(value) ? deepSort(value) : value,
      }),
      {},
    );

  return object;
}

function IsValidObject(obj: unknown): obj is Record<string, unknown> {
  if (!obj) return false;
  return isObject(obj);
}
