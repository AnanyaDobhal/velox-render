import { compile } from "./compiler/compile";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

const sourceCode = `
div {
  width: 200px;
  height: 100px;
}
`;

compile(sourceCode, canvas);

 //Lexer Testing...

import { HtmlLexer } from "./lexer/lexer";

const input = `<div class="box">Hello</div>`;

const lexResult = HtmlLexer.tokenize(input);

console.log(lexResult.tokens);