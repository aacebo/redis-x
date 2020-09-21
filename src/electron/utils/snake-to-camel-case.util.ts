export function snakeToCamelCase(v: string) {
  return v.replace(/([-_][a-z])/g, g => g.toUpperCase().replace('-', '').replace('_', ''));
}
