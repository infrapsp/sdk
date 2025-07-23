type OnlyNumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

/*
 * Aggregates an array of objects by specified keys and sums the values of specified numeric fields.
 *
 * @param data - The array of objects to aggregate.
 * @param groupByKeys - The keys to group by.
 * @param sumFields - The numeric fields to sum.
 * @returns An array of aggregated objects with grouped keys and summed fields.
 */
export function aggregateObjects<
  T extends Record<string, unknown>,
  G extends readonly (keyof T)[],
  S extends readonly OnlyNumericKeys<T>[],
>(
  data: T[],
  groupByKeys: G,
  sumFields: S,
): Array<Pick<T, G[number]> & Pick<T, S[number]>> {
  const result = Object.values(
    data.reduce<Record<string, Pick<T, G[number]> & Pick<T, S[number]>>>((acc, item) => {
      const key = groupByKeys.map((k) => item[k]).join('|');

      if (!acc[key]) {
        const base = {} as Pick<T, G[number]> & Pick<T, S[number]>;

        for (const k of groupByKeys) {
          base[k] = item[k];
        }

        for (const k of sumFields) {
          base[k] = item[k];
        }

        acc[key] = base;
      } else {
        for (const k of sumFields) {
          acc[key][k] = Number(acc[key][k]) + Number(item[k]) as T[typeof k];
        }
      }

      return acc;
    }, {}),
  );

  return result;
}
