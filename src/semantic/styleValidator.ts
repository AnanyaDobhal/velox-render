import { CompilerError } from "../errors/CompilerError"
import type { StylesheetNode } from "../ast/asttypes"

const VALID_PROPERTIES = [
  "width",
  "height",
  "margin",
  "padding",
  "background-color"
]

function isLength(value: string): boolean {
  return /^[0-9]+(px|%)$/.test(value)
}

function isColor(value: string): boolean {
  return /^#[0-9a-fA-F]{3,6}$/.test(value) || /^[a-zA-Z]+$/.test(value)
}

function validateDeclaration(decl: any) {

  const { property, value } = decl

  if (!VALID_PROPERTIES.includes(property)) {
    throw new CompilerError(`Invalid CSS property "${property}"`)
  }

  switch (property) {

    case "width":
    case "height":
    case "margin":
    case "padding":

      if (!isLength(value)) {
        throw new CompilerError(
          `Invalid value "${value}" for property "${property}"`
        )
      }

      break

    case "background-color":

      if (!isColor(value)) {
        throw new CompilerError(
          `Invalid color value "${value}"`
        )
      }

      break
  }
}
function validateRule(rule: any) {

  if (rule.declarations) {
    rule.declarations.forEach(validateDeclaration)
  }

  if (rule.children) {
    rule.children.forEach(validateRule)
  }

}

export function validateStylesheet(ast: StylesheetNode) {

  if (!ast.rules) return

  ast.rules.forEach(validateRule)

}