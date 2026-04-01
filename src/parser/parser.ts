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
    Percent,
    LCurly,
    RCurly,
    Colon,
    SemiColon,
    Text
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
            this.SUBRULE(this.blockItem);
        });
        this.CONSUME(RCurly);
    });

    public blockItem = this.RULE("blockItem", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.declaration) },
            { ALT: () => this.SUBRULE(this.rule) }
        ]);
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
            { ALT: () => this.CONSUME(Padding) },
            { ALT: () => this.CONSUME(Text) } 
        ]);
    });

    // <value> ::= <HexColor> | <Identifier> | <NumberLiteral> <unit>?
    public value = this.RULE("value", () => {
        this.OR([
            { ALT: () => this.CONSUME(HexColor) },

            {
                ALT: () => {
                    this.CONSUME(NumberLiteral);

                    this.OPTION(() => {
                        this.OR2([
                            { ALT: () => this.CONSUME(Percent) },     // %
                            { ALT: () => this.CONSUME(Identifier) }   // px, rem, etc
                        ]);
                    });
                }
            },

            { ALT: () => this.CONSUME2(Identifier) }
        ]);
    });
}

// Instantiate the parser once to be reused
export const parserInstance = new VeloxParser();