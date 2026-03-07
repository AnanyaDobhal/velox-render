import { describe, it, expect } from "vitest";
import { compile } from "../src/compiler/compile";

describe("Velox Layout Engine", () => {

  it("should generate layout tree with nested elements and percentages", () => {

    const input = `
      div {
        width: 200px;
        height: 200px;

        div {
          width: 50%;
          height: 100px;
        }
      }
    `;

    const layout: any = compile(input);

    console.log("LAYOUT RESULT:", layout);

    // layoutTree returns LayoutNode[]
    const root = layout[0];

    expect(root.width).toBe(200);
    expect(root.height).toBe(200);

    const child = root.children[0];

    expect(child.width).toBe(100);
    expect(child.height).toBe(100);

  });

});