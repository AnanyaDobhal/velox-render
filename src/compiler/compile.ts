import { tokenize } from "../lexer/lexer";

export function compile(sourceCode: string, canvas: HTMLCanvasElement) {
  console.log("Starting compilation...");
  
  // 1️⃣ Lexical Analysis
  console.log("Step 1: Lexing input...");
  const lexResult = tokenize(sourceCode);
  console.log("Tokens:", lexResult.tokens);


  // 2️⃣ Parsing (placeholder)
  console.log("Step 2: Parsing tokens...");
  // const ast = parse(lexResult);

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