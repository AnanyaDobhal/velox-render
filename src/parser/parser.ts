import { CstParser } from "chevrotain";
import {
    allTokens,
    Div,
    Span,
    BackgroundColor,
    Width,
    Height,
    Margin,
    Padding,
    NumberLiteral,
    HexColor,
    Identifier,
    Px,
    Percent,
    LCurly,
    RCurly,
    Colon,
    SemiColon,
} from "../lexer/token";

export class VeloxParser extends CstParser {
    constructor() {
        super(allTokens);
        this.performSelfAnalysis();
    }

    // <stylesheet> ::= <rule>*
    public stylesheet = this.RULE("stylesheet", () => {
        this.MANY(() => {
            this.SUBRULE(this.rule);
        });
    });

    // <rule> ::= <selector> "{" <declaration>* "}"
    public rule = this.RULE("rule", () => {
        this.SUBRULE(this.selector);
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.SUBRULE(this.declaration);
        });
        this.CONSUME(RCurly);
    });

    // <selector> ::= "div" | "span"
    public selector = this.RULE("selector", () => {
        this.OR([
            { ALT: () => this.CONSUME(Div) },
            { ALT: () => this.CONSUME(Span) }
        ]);
    });

    // <declaration> ::= <property> ":" <value> ";"
    public declaration = this.RULE("declaration", () => {
        this.SUBRULE(this.property);
        this.CONSUME(Colon);
        this.SUBRULE(this.value);
        this.CONSUME(SemiColon);
    });

    // <property> ::= "background-color" | "width" | "height" | "margin" | "padding"
    public property = this.RULE("property", () => {
        this.OR([
            { ALT: () => this.CONSUME(BackgroundColor) },
            { ALT: () => this.CONSUME(Width) },
            { ALT: () => this.CONSUME(Height) },
            { ALT: () => this.CONSUME(Margin) },
            { ALT: () => this.CONSUME(Padding) }
        ]);
    });

    // <value> ::= <HexColor> | <Identifier> | <NumberLiteral> <unit>?
    public value = this.RULE("value", () => {
        this.OR([
            { ALT: () => this.CONSUME(HexColor) },
            { ALT: () => this.CONSUME(Identifier) },
            {
                ALT: () => {
                    this.CONSUME(NumberLiteral);
                    this.OPTION(() => {
                        this.SUBRULE(this.unit);
                    });
                }
            }
        ]);
    });

    // <unit> ::= "px" | "%"
    public unit = this.RULE("unit", () => {
        this.OR([
            { ALT: () => this.CONSUME(Px) },
            { ALT: () => this.CONSUME(Percent) }
        ]);
    });
}

// Instantiate the parser once to be reused
export const parserInstance = new VeloxParser();
