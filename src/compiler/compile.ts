import { tokenize } from "../lexer/lexer";
import { parserInstance } from "../parser/parser";
import { ASTBuilder } from "../ast/astbuilder";

export function compile(sourceCode: string, canvas: HTMLCanvasElement) {
  console.log("Starting compilation...");

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

  const cst = parserInstance.stylesheet();

  if (parserInstance.errors.length > 0) {
    console.error("Parsing Errors Detected:");

    parserInstance.errors.forEach((err) => {
      console.error(
        `Line ${err.token.startLine}, Column ${err.token.startColumn}: ${err.message}`
      );
    });

    return null;
  }

  console.log("Parsing successful! CST Generated.");
  console.log("===== CST OUTPUT =====");
  console.log(JSON.stringify(cst, null, 2));

  // 3️⃣ AST Generation (YOUR TASK 🔥)
  console.log("Step 3: Building AST...");

  const astBuilder = new ASTBuilder();
  const ast = astBuilder.visit(cst);

  console.log("===== AST OUTPUT =====");
  console.log(JSON.stringify(ast, null, 2));

  // 4️⃣ Rendering (temporary demo)
  console.log("Step 4: Rendering to canvas...");

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Temporary static demo render
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 200, 150);

  console.log("Compilation finished.");

  return ast; // optional but good practice
}