export type EmptyObject = Record<string | number | symbol, never>;

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum FileFormat {
  CSV = 'csv',
  XLSX = 'xlsx',
}
