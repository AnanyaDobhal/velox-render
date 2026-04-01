import type { LayoutNode } from "../types/layout";

/* ========================================= */
/*           RENDERER OPTIONS                */
/* ========================================= */

interface RenderOptions {
  debug?: boolean;        // Show borders & colors
  showBorder?: boolean;   // Force border rendering
}

/* ========================================= */
/*           MAIN ENTRY FUNCTION             */
/* ========================================= */

export function renderTree(
  canvas: HTMLCanvasElement,
  rootNodes: LayoutNode[],
  options: RenderOptions = {}
) {
  try {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    // Clear canvas before rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rootNodes.forEach((node, index) => {
      renderNode(ctx, node, 0, options, index);
    });

  } catch (error) {
    console.error("Rendering failed:", error);
  }
}

/* ========================================= */
/*           CORE RENDER FUNCTION            */
/* ========================================= */

function renderNode(
  ctx: CanvasRenderingContext2D,
  node: LayoutNode,
  depth: number,
  options: RenderOptions,
  index: number
) {
  try {

    /* ========= VALIDATION ========= */

    if (!isValidNode(node)) {
      console.warn("Invalid layout node skipped:", node);
      return;
    }

    const { x, y, width, height } = node;

    /* ========= DEBUG COLOR ========= */

    const debugColors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7"];

    let fillColor = node.style?.backgroundColor || "transparent";

    if (options.debug && fillColor === "transparent") {
      fillColor = debugColors[depth % debugColors.length];
    }

    /* ========= DRAW BACKGROUND ========= */

    if (fillColor !== "transparent") {
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, width, height);
    }

    /* ========= DRAW PADDING AREA (debug) ========= */
    if (options.debug && node.box) {
    ctx.strokeStyle = "orange";

    const paddingX = x + node.box.padding.left;
    const paddingY = y + node.box.padding.top;

    const paddingWidth =
        width - node.box.padding.left - node.box.padding.right;

    const paddingHeight =
        height - node.box.padding.top - node.box.padding.bottom;

    ctx.strokeRect(paddingX, paddingY, paddingWidth, paddingHeight);
    }

    /* ========= DRAW TEXT ========= */
    if (node.text && node.text.trim() !== "") {
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";

      ctx.textBaseline = "top";

      ctx.fillText(
        node.text,
        node.x + 5,  // small padding
        node.y + 5
      );
    }

    /* ========= DRAW BORDER ========= */

    if (options.debug || options.showBorder) {
      ctx.strokeStyle = node.style?.borderColor || "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
    }

    /* ========= RENDER CHILDREN ========= */

    if (node.children && node.children.length > 0) {
      node.children.forEach((child, i) => {
        renderNode(ctx, child, depth + 1, options, i);
      });
    }

  } catch (error) {
    console.error("Error rendering node:", error, node);
  }
}

/* ========================================= */
/*           VALIDATION FUNCTION             */
/* ========================================= */

function isValidNode(node: LayoutNode): boolean {
  return (
    node &&
    typeof node.x === "number" &&
    typeof node.y === "number" &&
    typeof node.width === "number" &&
    typeof node.height === "number" &&
    node.width >= 0 &&
    node.height >= 0
  );
}