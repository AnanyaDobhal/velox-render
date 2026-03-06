export interface EdgeSizes {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function resolveEdge(value: string): EdgeSizes {
  const size = parseFloat(value) || 0;

  return {
    top: size,
    right: size,
    bottom: size,
    left: size,
  };
}