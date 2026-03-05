export class CompilerError extends Error {
  line?: number
  column?: number

  constructor(message: string, line?: number, column?: number) {
    super(message)
    this.name = "CompilerError"
    this.line = line
    this.column = column
  }
}