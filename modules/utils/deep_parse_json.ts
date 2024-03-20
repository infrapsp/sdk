// deno-lint-ignore-file no-explicit-any
const isNumString = (str: string) => !isNaN(Number(str));

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
      obj[key] = isNumString(val) ? val : deepParseJson(val);
      return obj;
    }, {} as T);
  } else {
    // otherwise return whatever was received
    return jsonString as any;
  }
}
