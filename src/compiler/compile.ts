import { tokenize } from "../lexer/lexer";
import { parserInstance } from "../parser/parser";
import { ASTBuilder } from "../ast/astbuilder";
import { resolveStylesheet } from "../semantic/styleResolver";
import { validateStylesheet } from "../semantic/styleValidator";
import { layoutTree } from "../layout/layoutEngine";        // ← ADD THIS

export function compile(sourceCode: string, canvas: HTMLCanvasElement) {
  console.log("Starting compilation...");
  try {
    // 1️⃣ Lexical Analysis
    console.log("Step 1: Lexing input...");
    const lexResult = tokenize(sourceCode);
    if (lexResult.tokens.length === 0) {
      console.log("No valid tokens found.");
      return;
    }

    // 2️⃣ Parsing
    console.log("Step 2: Parsing tokens...");
    parserInstance.input = lexResult.tokens;

    if (parserInstance.errors.length > 0) {
      console.error("Parsing Error:", parserInstance.errors[0].message);
      throw new Error("Parsing failed");
    }

    const cst = parserInstance.stylesheet();
    console.log("Parsing successful! CST Generated.");
    console.log("===== CST OUTPUT =====");
    console.log(JSON.stringify(cst, null, 2));

    // 3️⃣ AST Generation
    console.log("Step 3: Building AST...");
    const astBuilder = new ASTBuilder();
    const ast = astBuilder.visit(cst);
    validateStylesheet(ast);
    console.log("===== AST OUTPUT =====");
    console.log(JSON.stringify(ast, null, 2));

    // 4️⃣ Style Resolution
    const styledTree = resolveStylesheet(ast);
    console.log("Styled Tree:", styledTree);

    // 5️⃣ Layout Tree                                      // ← ADD THIS
    console.log("Step 5: Computing layout tree...");        // ← ADD THIS
    const layout = layoutTree(styledTree, canvas.width, canvas.height); // ← ADD THIS
    console.log("===== LAYOUT TREE =====");                // ← ADD THIS
    console.log(JSON.stringify(layout, null, 2));           // ← ADD THIS

    // 6️⃣ Rendering (temporary demo)
    console.log("Step 6: Rendering to canvas...");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 200, 150);

    console.log("Compilation finished.");
    return layout;

  } catch (err) {
    console.error("Compiler Error:", err);
  }
}