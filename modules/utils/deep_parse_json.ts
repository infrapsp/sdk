// deno-lint-ignore-file no-explicit-any
const isNumString = (str: string) => !isNaN(Number(str));

// Checks if string is in YYYY-MM-DDTHH:MM:SS.sssZ format
const isDateString = (str: string) => {
  const _regExp = new RegExp(
    '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$',
  );
  return _regExp.test(str);
};

export function deepParseJson<T = any>(jsonString: number | string | Record<string, any>): T {
  // if not stringified json rather a simple string value then JSON.parse will throw error
  // otherwise continue recursion
  if (typeof jsonString === 'string') {
    if (isNumString(jsonString)) {
      // if a numeric string is received, return itself
      // otherwise JSON.parse will convert it to a number
      return jsonString as any;
    }
    try {
      return deepParseJson<T>(JSON.parse(jsonString));
    } catch {
      return jsonString as any;
    }
  } else if (Array.isArray(jsonString)) {
    // if an array is received, map over the array and deepParse each value
    return jsonString.map((val) => deepParseJson<T>(val)) as any;
  } else if (typeof jsonString === 'object' && jsonString !== null) {
    // if an object is received then deepParse each element in the object
    // typeof null returns 'object' too, so we have to eliminate that
    return Object.keys(jsonString).reduce((obj: any, key: string) => {
      const val = jsonString[key];
      obj[key] = isNumString(val) ? val : isDateString(val) ? new Date(val) : deepParseJson(val);
      return obj;
    }, {} as T);
  } else {
    // otherwise return whatever was received
    return jsonString as any;
  }
}
