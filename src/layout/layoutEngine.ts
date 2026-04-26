import { computeBoxModel } from "./boxModel";
import type { StyledRule } from "../semantic/styleResolver";
import type { LayoutNode } from "../types/layout";


/* ============================== */
/*        LAYOUT ONE NODE         */
/* ============================== */

function layoutNode(
  rule: StyledRule,
  parentX: number,
  parentY: number,
  parentWidth: number,
  parentHeight: number
): LayoutNode {

  // Step 1: compute box model for this node
  const box = computeBoxModel(rule.style, parentWidth, parentHeight);

  // Step 2: this element's top-left position on canvas
  const x = parentX + box.margin.left;
  const y = parentY + box.margin.top;

// Step 3: layout children — flex-aware layout

let cursorX = x + box.padding.left;
let cursorY = y + box.padding.top;

const children: LayoutNode[] = [];

for (const child of rule.children) {

  let childNode: LayoutNode;

  if (rule.style.display === "flex") {

    if (rule.style.flexDirection === "row") {
      // 👉 HORIZONTAL LAYOUT

      childNode = layoutNode(
        child,
        cursorX,
        y + box.padding.top,
        box.contentWidth,
        box.contentHeight
      );

      cursorX +=
        childNode.box.margin.left +
        childNode.box.width +
        childNode.box.margin.right;

    } else {
      // 👉 COLUMN (same as vertical)

      childNode = layoutNode(
        child,
        x + box.padding.left,
        cursorY,
        box.contentWidth,
        box.contentHeight
      );

      cursorY +=
        childNode.box.margin.top +
        childNode.box.height +
        childNode.box.margin.bottom;
    }

  } else {
    // 👉 DEFAULT BLOCK LAYOUT

    childNode = layoutNode(
      child,
      x + box.padding.left,
      cursorY,
      box.contentWidth,
      box.contentHeight
    );

    cursorY +=
      childNode.box.margin.top +
      childNode.box.height +
      childNode.box.margin.bottom;
    }
  children.push(childNode);
}
return {
  selector: rule.selector,
  box,
  width: box.width,
  height: box.height,
  x,
  y,
  style: rule.style,
  text: rule.style.text,
  children
};
}

/* ============================== */
/*       LAYOUT FULL TREE         */
/* ============================== */

export function layoutTree(
  styledRules: StyledRule[],
  canvasWidth: number,
  canvasHeight: number
): LayoutNode[] {

  const nodes: LayoutNode[] = [];
  let cursorY = 0;

  for (const rule of styledRules) {
    const node = layoutNode(rule, 0, cursorY, canvasWidth, canvasHeight);

    // stack top-level elements vertically
    cursorY +=
      node.box.margin.top +
      node.box.height +
      node.box.margin.bottom;

    nodes.push(node);
  }

  return nodes;
}