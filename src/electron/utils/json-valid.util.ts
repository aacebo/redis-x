export function jsonValid(v: any) {
  try {
    JSON.parse(v);
  } catch (err) {
    return false;
  }

  return true;
}
