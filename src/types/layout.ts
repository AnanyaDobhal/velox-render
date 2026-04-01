import type { LayoutBox } from "../layout/boxModel";
import type { ComputedStyle } from "../semantic/styleResolver";

export interface LayoutNode {
  selector: string;
  box: LayoutBox;

  width: number;
  height: number;

  x: number;
  y: number;

  style: ComputedStyle;
  text?: string;
  children: LayoutNode[];
}