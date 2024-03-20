const CHAR_UPPER_A = 0x41;
const CHAR_LOWER_A = 0x61;
const CHAR_UPPER_Z = 0x5a;
const CHAR_LOWER_Z = 0x7a;
const CHAR_0 = 0x30;
const CHAR_9 = 0x39;
const CHAR_MINUS = 0x2d;
const CHAR_SPACE = 0x20;
const CHAR_UNDERSCORE = 0x5f;

type ObjectOrArray = Record<string, unknown> | Array<unknown>;
type Options = { sep?: string; stopPaths?: string[] };

function isUpper(c: number) {
  return CHAR_UPPER_A <= c && c <= CHAR_UPPER_Z;
}

function isLower(c: number) {
  return CHAR_LOWER_A <= c && c <= CHAR_LOWER_Z;
}

function isDigit(c: number) {
  return CHAR_0 <= c && c <= CHAR_9;
}

function toUpper(c: number) {
  return c - 0x20;
}

function toLower(c: number) {
  return c + 0x20;
}

export function camelize(str: string, options?: Options): string {
  const firstChar = str.charCodeAt(0);

  if (isDigit(firstChar) || firstChar === CHAR_MINUS || isNaN(firstChar)) {
    return str;
  }

  let changed = isUpper(firstChar);
  const transformed = changed ? [toLower(firstChar)] : [firstChar];

  const length = str.length;
  for (let i = 1; i < length; i++) {
    let c = str.charCodeAt(i);

    const expectedChars = options?.sep ? [options.sep.charCodeAt(0)] : [CHAR_UNDERSCORE, CHAR_SPACE, CHAR_MINUS];
    if (expectedChars.includes(c)) {
      changed = true;
      c = str.charCodeAt(++i);

      if (isNaN(c)) {
        return str;
      }

      if (isLower(c)) {
        transformed.push(toUpper(c));
      } else {
        transformed.push(c);
      }
    } else {
      transformed.push(c);
    }
  }

  if (!changed) {
    return str;
  }

  return String.fromCharCode.apply(undefined, transformed);
}

export function decamelize(str: string, options?: Options): string {
  const firstChar = str.charCodeAt(0);

  if (!isLower(firstChar) || isNaN(firstChar)) {
    return str;
  }

  let changed = false;
  const transformed = [firstChar];

  let separator = CHAR_UNDERSCORE;

  if (options?.sep && options?.sep.charCodeAt(0)) {
    separator = options.sep.charCodeAt(0);
  }

  const length = str.length;
  for (let i = 1; i < length; i++) {
    const c = str.charCodeAt(i);

    if (isUpper(c)) {
      changed = true;
      transformed.push(separator);
      transformed.push(toLower(c));
    } else {
      transformed.push(c);
    }
  }

  if (!changed) {
    return str;
  }

  return String.fromCharCode.apply(undefined, transformed);
}

function isObjectOrArray(value: unknown): value is ObjectOrArray {
  return Boolean(value) && typeof value === 'object' && !(value instanceof Function) && !(value instanceof Date);
}

function transformArray(array: Array<unknown>, transform: (key: string, options?: Options) => string, options?: Options) {
  const length = array.length;
  const transformed = new Array(length);
  let idx = 0;
  for (const item of array) {
    transformed[idx++] = isObjectOrArray(item) ? transformKeys(item, transform, options) : item;
  }
  return transformed;
}

function transformKeys(obj: ObjectOrArray | Array<unknown>, transform: (key: string, options?: Options) => string, options?: Options) {
  if (Array.isArray(obj)) {
    return transformArray(obj, transform, options);
  }

  if (typeof obj.prototype !== 'undefined') {
    return obj;
  }

  const stopPathsSet = new Set(options?.stopPaths || []);

  const transformed: Record<string, unknown> = {};
  for (const key in obj) {
    if (stopPathsSet.has(key)) {
      transformed[key] = obj[key];
    } else {
      const value = obj[key];
      const nextKey = transform(key, options);
      transformed[nextKey] = isObjectOrArray(value) ? transformKeys(value, transform, options) : value;
    }
  }
  return transformed;
}

export function camelizeKeys(obj?: ObjectOrArray | null, options?: Options): unknown {
  if (!isObjectOrArray(obj)) {
    return obj;
  }

  return transformKeys(obj, camelize, options);
}

export function decamelizeKeys(obj?: ObjectOrArray | null, options?: Options): unknown {
  if (!isObjectOrArray(obj)) {
    return obj;
  }

  return transformKeys(obj, decamelize, options);
}
