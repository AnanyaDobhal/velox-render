import { createToken } from "chevrotain";

// Symbols
export const OpenAngle = createToken({ name: "OpenAngle", pattern: /</ });
export const CloseAngle = createToken({ name: "CloseAngle", pattern: />/ });
export const Slash = createToken({ name: "Slash", pattern: /\// });
export const Equals = createToken({ name: "Equals", pattern: /=/ });

// Strings
export const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"[^"]*"/
});

// Identifier (tag names, attribute names)
export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z][a-zA-Z0-9-]*/
});

// Text inside tags
export const Text = createToken({
  name: "Text",
  pattern: /[^<>]+/
});

// Whitespace (ignored)
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: "skipped"
});

// Order matters!
export const allTokens = [
  WhiteSpace,
  OpenAngle,
  CloseAngle,
  Slash,
  Equals,
  StringLiteral,
  Identifier,
  Text
];