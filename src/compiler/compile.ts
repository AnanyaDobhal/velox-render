import { tokenize } from "../lexer/lexer";
import { parserInstance } from "../parser/parser";
import { ASTBuilder } from "../ast/astbuilder";
import { resolveStylesheet } from "../semantic/styleResolver";
import { validateStylesheet } from "../semantic/styleValidator";
import { layoutTree } from "../layout/layoutEngine";
import { renderTree } from "../renderer/canvasRenderer";

export function compile(sourceCode: string, canvas?: HTMLCanvasElement) {
  console.log("🚀 Starting compilation...");

  try {
    /* ============================= */
    /* 1️⃣ LEXICAL ANALYSIS          */
    /* ============================= */

    console.log("Step 1: Lexing...");
    const lexResult = tokenize(sourceCode);

    if (!lexResult.tokens.length) {
      console.warn("⚠️ No tokens generated.");
      return;
    }

    /* ============================= */
    /* 2️⃣ PARSING                   */
    /* ============================= */

    console.log("Step 2: Parsing...");
    parserInstance.input = lexResult.tokens;

    const cst = parserInstance.stylesheet();

    if (parserInstance.errors.length > 0) {
      console.error("❌ Parsing errors:", parserInstance.errors);
      throw new Error("Parsing failed");
    }

    console.log("✅ CST Generated");

    /* ============================= */
    /* 3️⃣ AST GENERATION            */
    /* ============================= */

    console.log("Step 3: Building AST...");
    const ast = new ASTBuilder().visit(cst);

    validateStylesheet(ast);

    console.log("✅ AST Ready");

    /* ============================= */
    /* 4️⃣ STYLE RESOLUTION          */
    /* ============================= */

    console.log("Step 4: Resolving styles...");
    const styledTree = resolveStylesheet(ast);

    console.log("Styled Tree:", styledTree);

    /* ============================= */
    /* 5️⃣ LAYOUT COMPUTATION        */
    /* ============================= */

    console.log("Step 5: Computing layout...");

    const width = canvas?.width ?? 800;
    const height = canvas?.height ?? 600;

    const layout = layoutTree(styledTree, width, height);

    console.log("✅ Layout Tree Ready");
    console.log(JSON.stringify(layout, null, 2));

    /* ============================= */
    /* 6️⃣ RENDERING (FIXED)         */
    /* ============================= */

    if (canvas) {
      console.log("Step 6: Rendering...");

      // 👉 USE YOUR REAL RENDERER
      renderTree(canvas, layout, {
        debug: true,       // optional: colored boxes
        showBorder: true
      });

      console.log("🎨 Rendering completed");
    }

    console.log("🎉 Compilation finished");

    return layout;

  } catch (err) {
    console.error("💥 Compiler Error:", err);
    throw err;
  }
}