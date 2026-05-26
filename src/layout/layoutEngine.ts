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

if (rule.style.display === "flex") {

  // ROW ALIGNMENT
  if (rule.style.flexDirection === "row") {

    const totalChildrenWidth = rule.children.reduce((sum, child) => {

      const childBox = computeBoxModel(
        child.style,
        box.contentWidth,
        box.contentHeight
      );

      return (
        sum +
        childBox.margin.left +
        childBox.width +
        childBox.margin.right
      );

    }, 0);

    const remainingSpace =
      box.contentWidth - totalChildrenWidth;
      console.log("remainingSpace", remainingSpace);
    switch (rule.style.justifyContent) {

      case "center":
        cursorX += remainingSpace / 2;
        break;

      case "flex-end":
        cursorX += remainingSpace;
        break;
    }

  } else {

    // COLUMN ALIGNMENT

    const totalChildrenHeight = rule.children.reduce((sum, child) => {

      const childBox = computeBoxModel(
        child.style,
        box.contentWidth,
        box.contentHeight
      );

      return (
        sum +
        childBox.margin.top +
        childBox.height +
        childBox.margin.bottom
      );

    }, 0);

    const remainingSpace =
      box.contentHeight - totalChildrenHeight;

    switch (rule.style.justifyContent) {

      case "center":
        cursorY += remainingSpace / 2;
        break;

      case "flex-end":
        cursorY += remainingSpace;
        break;
    }
  }
}

const children: LayoutNode[] = [];

for (const child of rule.children) {

  let childNode: LayoutNode;

  // ✅ CONTENT AREA AVAILABLE TO CHILDREN
  const availableWidth =
    box.width -
    box.padding.left -
    box.padding.right;

  const availableHeight =
    box.height -
    box.padding.top -
    box.padding.bottom;

  if (rule.style.display === "flex") {

    if (rule.style.flexDirection === "row") {

      // 👉 HORIZONTAL LAYOUT

      const childMargin = computeBoxModel(
        child.style,
        availableWidth,
        availableHeight
      ).margin;

      let childY = y + box.padding.top;
      if (rule.style.alignItems === "center") {
        const childBox = computeBoxModel(
          child.style,
          availableWidth,
          availableHeight
        );

        childY +=
          (box.contentHeight - childBox.height) / 2;

      } else if (rule.style.alignItems === "flex-end") {

        const childBox = computeBoxModel(
          child.style,
          availableWidth,
          availableHeight
        );

        childY +=
          box.contentHeight - childBox.height;
      }

      childNode = layoutNode(
        child,
        cursorX,
        childY,
        availableWidth,
        availableHeight
      );

      cursorX +=
        childMargin.left +
        childNode.box.width +
        childMargin.right;

    } else {

      // 👉 COLUMN LAYOUT

      const childMargin = computeBoxModel(
        child.style,
        availableWidth,
        availableHeight
      ).margin;

      childNode = layoutNode(
        child,
        x + box.padding.left,
        cursorY,
        availableWidth,
        availableHeight
      );

      cursorY +=
        childMargin.top +
        childNode.box.height +
        childMargin.bottom;
    }

  } else {

    // 👉 DEFAULT BLOCK LAYOUT

    const childMargin = computeBoxModel(
      child.style,
      availableWidth,
      availableHeight
    ).margin;

    childNode = layoutNode(
      child,
      x + box.padding.left,
      cursorY,
      availableWidth,
      availableHeight
    );

    cursorY +=
      childMargin.top +
      childNode.box.height +
      childMargin.bottom;
  }

  children.push(childNode);
}
/* ============================== */
/*      AUTO SIZE FROM CHILDREN   */
/* ============================== */

if (rule.children.length > 0) {

  // FLEX ROW
  if (
    rule.style.display === "flex" &&
    rule.style.flexDirection === "row"
  ) {

    let totalWidth = 0;
    let maxHeight = 0;

    for (const child of children) {

      totalWidth +=
        child.box.margin.left +
        child.box.width +
        child.box.margin.right;

      const childHeight =
        child.box.margin.top +
        child.box.height +
        child.box.margin.bottom;

      maxHeight = Math.max(maxHeight, childHeight);
    }

    if (rule.style.width === "auto") {
      box.width = totalWidth + box.padding.left + box.padding.right;
      box.contentWidth = totalWidth;
    }

    if (rule.style.height === "auto") {
      box.height = maxHeight + box.padding.top + box.padding.bottom;
      box.contentHeight = maxHeight;
    }

  } else {

    // BLOCK / COLUMN LAYOUT

    let maxWidth = 0;
    let totalHeight = 0;

    for (const child of children) {

      const childWidth =
        child.box.margin.left +
        child.box.width +
        child.box.margin.right;

      maxWidth = Math.max(maxWidth, childWidth);

      totalHeight +=
        child.box.margin.top +
        child.box.height +
        child.box.margin.bottom;
    }

    if (rule.style.width === "auto") {
      box.width = maxWidth + box.padding.left + box.padding.right;
      box.contentWidth = maxWidth;
    }

    if (rule.style.height === "auto") {
      box.height = totalHeight + box.padding.top + box.padding.bottom;
      box.contentHeight = totalHeight;
    }
  }
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