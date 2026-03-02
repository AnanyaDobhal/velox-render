import { Lexer } from "chevrotain";
import { allTokens } from "./token";

export const HtmlLexer = new Lexer(allTokens);