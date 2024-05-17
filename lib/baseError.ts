type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable }

export class BaseError extends Error {
  public readonly context?: Jsonable
  public readonly cause?: Error | unknown

  constructor(
    message: string,
    options: { cause?: Error | unknown; context?: Jsonable } = {}
  ) {
    const { cause, context } = options

    super(message, { cause })
    this.name = this.constructor.name

    this.context = context
    this.cause = cause
  }

  public toString() {
    return this.toJSON()
  }

  public toJSON() {
    return JSON.stringify({ cause: this.cause, message: this.message })
  }
}
