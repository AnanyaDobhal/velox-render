import { parserInstance } from "../parser/parser";
import type { StylesheetNode } from "./asttypes";

const BaseVisitor = parserInstance.getBaseCstVisitorConstructor();

export class ASTBuilder extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor(); 
  }

  stylesheet(ctx: any): StylesheetNode {
    return {
      type: "Stylesheet",
      rules: ctx.rule ? ctx.rule.map((r: any) => this.visit(r)) : []
    };
  }

  rule(ctx: any) {
    const selector = ctx.selector
      ? this.visit(ctx.selector[0])
      : "";

    const declarations: any[] = [];
    const children: any[] = [];

    if (ctx.blockItem) {
      ctx.blockItem.forEach((item: any) => {
        const result = this.visit(item);

        if (!result) return;

        if (result.type === "Declaration") {
          declarations.push(result);
        } else if (result.type === "Rule") {
          children.push(result);
        }
      });
    }

    return {
      type: "Rule",
      selector,
      declarations,
      children
    };
  }

  selector(ctx: any) {
    if (ctx.Div) return ctx.Div[0].image;
    if (ctx.Span) return ctx.Span[0].image;
    return "";
  }

  blockItem(ctx: any) {
    if (ctx.declaration) {
      return this.visit(ctx.declaration[0]);
    }
    if (ctx.rule) {
      return this.visit(ctx.rule[0]);
    }
    return null;
  }

  declaration(ctx: any) {
    const property = ctx.property
      ? this.visit(ctx.property[0])
      : "";

    const value = ctx.value
      ? this.visit(ctx.value[0])
      : "";

    return {
      type: "Declaration",
      property,
      value
    };
  }

  property(ctx: any) {
    const token =
      ctx.Width;
      ctx.Height; 
      ctx.Margin ;
      ctx.Padding ;
      ctx.BackgroundColor;
      ctx.BorderRadius;
      ctx.Text;
      ctx.Display; 
      ctx.FlexDirection; 
    return token ? token[0].image : "";
  }

  value(ctx: any) {
    if (ctx.HexColor) {
      return ctx.HexColor[0].image;
    }

    if (ctx.NumberLiteral) {
      const num = ctx.NumberLiteral[0].image;

      // support %
      if (ctx.Percent) {
        return num + "%";
      }

      // support px, rem, etc
      if (ctx.Identifier) {
        return num + ctx.Identifier[0].image;
      }

      return num;
    }

    if (ctx.Identifier) {
      return ctx.Identifier[0].image;
    }

    return "";
  }
}