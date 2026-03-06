export function resolveSize(value: string, parentSize: number): number {
  if (!value || value === "auto") return 0;

  if (value.endsWith("px")) {
    return parseFloat(value);
  }

  if (value.endsWith("%")) {
    const percent = parseFloat(value);
    return (percent / 100) * parentSize;
  }

  const n = parseFloat(value);
  return isNaN(n) ? 0 : n;
}