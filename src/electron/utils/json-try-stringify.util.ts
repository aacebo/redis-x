export function jsonTryStringify(v: any) {
  try {
    return JSON.stringify(v);
  } catch (err) { }
}
