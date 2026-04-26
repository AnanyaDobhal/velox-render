import { compile } from "./compiler/compile";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

/* ============================== */
/*        TEST 1 (VALID)          */
/* ============================== */

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
try {
  compile(validSourceCode, canvas);
  console.log("✅ Test 1 Passed");
} catch (e) {
  console.error("❌ Test 1 Failed Unexpectedly", e);
}

/* ============================== */
/*       TEST 2 (INVALID)         */
/* ============================== */

const InvalidSourceCode = `
div {
  width: 200%;
  height 100px;

  span {
    margin: 10px;
  }
}
`;

console.log("--- TEST 2: Invalid Source Code ---");
try {
  compile(InvalidSourceCode, canvas);
  console.error("❌ Test 2 Should Have Failed but Passed");
} catch (e) {
  console.log("✅ Test 2 Failed as Expected");
}

/* ============================== */
/*       TEST 3 (FLEXBOX)         */
/* ============================== */

const flexSourceCode = `
div {
  display: flex;
  flex-direction: row;

  div {
    width: 100px;
    height: 100px;
    background-color: red;
    text: A;
  }

  div {
    width: 100px;
    height: 100px;
    background-color: blue;
    text: B;
  }
}
`;

console.log("--- TEST 3: Flexbox Row Layout ---");
try {
  compile(flexSourceCode, canvas);
  console.log("✅ Test 3 Completed");
} catch (e) {
  console.error("❌ Test 3 Failed", e);
}