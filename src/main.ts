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