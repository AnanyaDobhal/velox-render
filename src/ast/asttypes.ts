export interface StylesheetNode {
  type: "Stylesheet";
  rules: RuleNode[];
}

export interface RuleNode {
  type: "Rule";
  selector: string;
  declarations: DeclarationNode[];
  children?: RuleNode[];
}

export interface DeclarationNode {
  type: "Declaration";
  property: string;
  value: string;
}