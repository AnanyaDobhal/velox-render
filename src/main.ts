import { compile } from "./compiler/compile";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

// VALID EXAMPLE
const validSourceCode = `
div {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  text: Hello;
}
div {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  border-radius: 20px;
}
`;

console.log("--- TEST 1: Valid Source Code ---");
compile(validSourceCode, canvas);

// INVALID EXAMPLE
const InvalidSourceCode = `
div {
  width: 200%;
  height 100px;

  span {
    margin: 10px;
  }
}
`;

console.log("--- TEST 1: Valid Source Code ---");
compile(InvalidSourceCode, canvas);