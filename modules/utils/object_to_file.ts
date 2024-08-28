import { decamelize } from '../../modules/utils/fast_case.ts';
import xlsx from 'npm:xlsx@0.18.5';
import { format } from 'https://deno.land/std@0.223.0/datetime/format.ts';

export function objectToFile<T extends Record<string, unknown>>(objects: T[], format: 'csv' | 'xlsx', mapping?: Partial<Record<keyof T, string>>) {
  if (objects.length === 0) return '';

  const dMapping = mapping || Object.keys(objects[0]).reduce((acc, key) => ({ ...acc, [key]: key }), {} as Partial<Record<keyof T, string>>);
  const entries = Object.entries(dMapping);
  const headers = entries.map(([_, value]) => value);

  if (format === 'csv') {
    let csv = headers.map((key) => decamelize(key!)).join(',') + '\n';

    for (const obj of objects) {
      const data = entries.map(([key, _]) => stringValue(obj[key]));

      csv += data.join(',') + '\n';
    }

    return csv;
  }

  if (format === 'xlsx') {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet([]);

    xlsx.utils.book_append_sheet(workbook, worksheet);

    xlsx.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    for (let i = 0;; i++) {
      const obj = objects[i];

      if (!obj) break;

      const data = entries.map(([key, _]) => stringValue(obj[key]));

      xlsx.utils.sheet_add_aoa(worksheet, [data], { origin: `A${i + 2}` });
    }

    const stream = xlsx.write(workbook, { type: 'buffer' });

    return stream;
  }
}

function stringValue(value: unknown): string {
  if (typeof value === 'string' && !isNaN(Date.parse(value))) return format(new Date(value), 'dd-MM-yyyy');
  else if (typeof value === 'number' && !isNaN(value)) return value.toString();
  else if (typeof value === 'string') return value;
  else if (typeof value === 'object') return JSON.stringify(value);
  else return '';
}
