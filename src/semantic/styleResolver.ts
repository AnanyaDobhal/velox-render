import type { StylesheetNode } from "../ast/asttypes";

/* ============================== */
/*        STYLE INTERFACES        */
/* ============================== */

export interface ComputedStyle {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderColor?: string;
  text?: string;

}

export interface StyledRule {
  type: "Rule";
  selector: string;
  style: ComputedStyle;
  children: StyledRule[];
}

/* ============================== */
/*        DEFAULT STYLE           */
/* ============================== */

const DEFAULT_STYLE: Required<ComputedStyle> = {
  width: "auto",
  height: "auto",
  margin: "0px",
  padding: "0px",
  backgroundColor: "transparent",
  borderColor: "black",
  text: ""
};

/* ============================== */
/*       STYLE RESOLUTION         */
/* ============================== */

function resolveRule(rule: any): StyledRule {

  const style: ComputedStyle = {};

  if (rule.declarations) {
    rule.declarations.forEach((decl: any) => {

      switch (decl.property) {
        case "width":
          style.width = decl.value;
          break;

        case "height":
          style.height = decl.value;
          break;

        case "margin":
          style.margin = decl.value;
          break;

        case "padding":
          style.padding = decl.value;
          break;

        case "background-color":
          style.backgroundColor = decl.value;
          break;
        
        case "border-color":
          style.borderColor = decl.value;
          break;
        case "text":
          style.text = decl.value;
          break;
      }

    });
  }

  return {
    type: "Rule",
    selector: rule.selector,
    style: applyDefaults(style),
    children: (rule.children ?? []).map(resolveRule)
  };
}

/* ============================== */
/*    RESOLVE WHOLE STYLESHEET    */
/* ============================== */

export function resolveStylesheet(ast: StylesheetNode): StyledRule[] {
  return (ast.rules ?? []).map(resolveRule);
}

/* ============================== */
/*       APPLY DEFAULTS           */
/* ============================== */

function applyDefaults(style: ComputedStyle): ComputedStyle {
  return { ...DEFAULT_STYLE, ...style };
}