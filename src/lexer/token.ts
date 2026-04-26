import { createToken, Lexer } from "chevrotain";

/* ========================= */
/*        WHITESPACE         */
/* ========================= */

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});
export const Percent = createToken({
  name: "Percent",
  pattern: /%/
});

/* ========================= */
/*        KEYWORDS           */
/* ========================= */

// HTML Elements
export const Div = createToken({
  name: "Div",
  pattern: /div/
});

export const Span = createToken({
  name: "Span",
  pattern: /span/
});

// CSS Properties
export const BackgroundColor = createToken({
  name: "BackgroundColor",
  pattern: /background-color/
});

export const Width = createToken({
  name: "Width",
  pattern: /width/
});

export const Height = createToken({
  name: "Height",
  pattern: /height/
});

export const Margin = createToken({
  name: "Margin",
  pattern: /margin/
});

export const Padding = createToken({
  name: "Padding",
  pattern: /padding/
});



/* ========================= */
/*        LITERALS           */
/* ========================= */

// Support decimal numbers like 12.5
export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /\d+(\.\d+)?/
});

// Hex colors like #ff0000
export const HexColor = createToken({
  name: "HexColor",
  pattern: /#[0-9a-fA-F]{3,6}/
});

// Named colors or generic identifiers
export const Display = createToken({
  name: "Display",
  pattern: /display/,
});

export const FlexDirection = createToken({
  name: "FlexDirection",
  pattern: /flex-direction/,
});
export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_-]*/
});

/* ========================= */
/*          SYMBOLS          */
/* ========================= */

export const LCurly = createToken({
  name: "LCurly",
  pattern: /{/
});

export const RCurly = createToken({
  name: "RCurly",
  pattern: /}/
});

export const Colon = createToken({
  name: "Colon",
  pattern: /:/
});

export const SemiColon = createToken({
  name: "SemiColon",
  pattern: /;/
});

export const Text = createToken({
  name: "Text",
  pattern: /text/,
  longer_alt: Identifier
});

export const BorderRadius = createToken({
  name: "BorderRadius",
  pattern: /border-radius/,
  longer_alt: Identifier
});
/* ========================= */
/*        TOKEN ORDER        */
/* ========================= */

export const allTokens = [
  WhiteSpace,

  // Keywords FIRST (longer/more specific first)
  BackgroundColor,
  Width,
  Height,
  Margin,
  Padding,
  Text, 
  BorderRadius, 
  Div,
  Span,
  Percent,

  // Literals
  HexColor,
  NumberLiteral,
  Display,
  FlexDirection,
  Identifier,

  // Symbols
  LCurly,
  RCurly,
  Colon,
  SemiColon
];

export const VeloxLexer = new Lexer(allTokens);