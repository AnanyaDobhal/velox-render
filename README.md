🏗 Current Architecture
main.ts
   ↓
compile()
   ↓
Canvas

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







