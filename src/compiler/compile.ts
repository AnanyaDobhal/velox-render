import { tokenize } from "../lexer/lexer";
import { parserInstance } from "../parser/parser";

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

  // Provide tokens to the parser
  parserInstance.input = lexResult.tokens;

  // Parse starting at the root rule: 'stylesheet'
  const cst = parserInstance.stylesheet();

  // Handle parsing errors
 if (parserInstance.errors.length > 0) {
  console.error("Parsing Errors Detected:");

  parserInstance.errors.forEach((err) => {
    console.error(
      `Line ${err.token.startLine}, Column ${err.token.startColumn}: ${err.message}`
    );
  });

  return null;
}

  console.log("Parsing successful! CST Generated.", cst);

  // 3️⃣ Semantic + Layout (placeholder)
  console.log("Step 3: Generating layout...");
  // const layoutTree = layoutEngine(ast);

  // 4️⃣ Code Generation (temporary demo)
  console.log("Step 4: Rendering to canvas...");

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  // Temporary demo rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 200, 150);

  console.log("Compilation finished.");
}