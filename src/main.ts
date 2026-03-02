import { compile } from "./compiler/compile";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

// VALID EXAMPLE
const validSourceCode = `
div {
  width: 50%;
  height: 200.5px;
  background-color: #ff0000;
}
span {
  margin: 10px;
  padding: 5;
  background-color: transparent;
}
`;

console.log("--- TEST 1: Valid Source Code ---");
compile(validSourceCode, canvas);


// INVALID EXAMPLE
const invalidSourceCode = `
div {
  width: 50%;
  height 200.5px;
  background-color: #ff0000;
}
`;

console.log("\\n--- TEST 2: Invalid Source Code ---");
compile(invalidSourceCode, canvas);
