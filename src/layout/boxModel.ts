import { resolveSize } from "./sizeResolver";
import { resolveEdge } from "./edgeResolver";
import type { EdgeSizes } from "./edgeResolver";

export interface LayoutBox {
  width: number;
  height: number;
  margin: EdgeSizes;
  padding: EdgeSizes;
  contentWidth: number;
  contentHeight: number;
}

export function computeBoxModel(
  styles: {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    backgroundColor?: string;
  },
  parentWidth: number,
  parentHeight: number
): LayoutBox {
  const margin  = resolveEdge(styles.margin  ?? "0px");
  const padding = resolveEdge(styles.padding ?? "0px");

  const width  = resolveSize(styles.width  ?? "auto", parentWidth);
  const height = resolveSize(styles.height ?? "auto", parentHeight);

  const contentWidth  = Math.max(0, width  - padding.left - padding.right);
  const contentHeight = Math.max(0, height - padding.top  - padding.bottom);

  return { width, height, margin, padding, contentWidth, contentHeight };
}