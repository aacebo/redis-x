export function jsonTryStringify(v: any, indent = 0) {
  try {
    return JSON.stringify(v, null, indent);
  } catch (err) { }
}
