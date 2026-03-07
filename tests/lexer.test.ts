import { describe, it, expect } from "vitest";
import { VeloxLexer } from "../src/lexer/token";

describe("Velox Lexer", () => {
  it("should tokenize simple div block", () => {
    const input = `
      div {
        width: 50%;
        height: 200px;
      }
    `;
    const result = VeloxLexer.tokenize(input);
    expect(result.errors.length).toBe(0);
    expect(result.tokens.length).toBeGreaterThan(0);
  });

  it("should tokenize multiple elements", () => {
    const input = `
      div { width: 100px; }
      div { height: 50px; }
    `;

    const result = VeloxLexer.tokenize(input);

    expect(result.errors.length).toBe(0);
    expect(result.tokens.length).toBeGreaterThan(5);
  });
});