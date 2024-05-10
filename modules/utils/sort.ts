export function sortById<T extends { id: string }>(ids: string[], items: T[]): T[] {
  const idMap = { ...items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}) } as Record<string, T>;

  return ids.map((id) => idMap[id]);
}
