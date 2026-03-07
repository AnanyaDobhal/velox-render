🏗 Current Architecture
main.ts
   ↓
compile()
   ↓
tokenize()
   ↓
VeloxLexer
   ↓
Tokens

Later it becomes:
main.ts
   ↓
compile()
   ↓
Lexer
   ↓
Parser
   ↓
AST
   ↓
Layout Engine
   ↓
Renderer
   ↓

Canvas

//DOCKER:
Build Docker Image Using:
docker build -t velox-render .
Run Container Using:
docker run -p 5173:5173 velox-render
Now open browser:
http://localhost:5173

------------------------------------------------
//Github: git add .
          git commit -m "added tokens"
          git push origin main
-------------------------------------------------


//LEXER Using Chevrotain

EXAMPLE:
Input:
<div class="box">Hello</div>
[
  OpenAngle,
  Identifier(div),
  Identifier(class),
  Equals,
  StringLiteral("box"),
  CloseAngle,
  Text(Hello),
  OpenAngle,
  Slash,
  Identifier(div),
  CloseAngle
]
To Run:
npm run dev