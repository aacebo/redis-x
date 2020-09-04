export function jsonTryParse(v: string) {
  try {
    return JSON.parse(v);
  } catch (err) { }
}
