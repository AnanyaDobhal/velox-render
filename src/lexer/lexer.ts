// src/lexer/lexer.ts
import { VeloxLexer } from "./token";

export interface LexResult {
  tokens: any[];
}

export function tokenize(input: string): LexResult {
  const result = VeloxLexer.tokenize(input);

  // Handle lexical errors
  if (result.errors.length > 0) {
    console.error("Lexing Errors:", result.errors);
    throw new Error("Lexing failed. Invalid syntax.");
  }

  return {
    tokens: result.tokens
  };
}