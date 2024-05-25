// export const groupBy = (x: Array<any>, f: Function) => {
//   x.reduce((a, b, i) => {
//     return (a[f(b, i, x)] ||= []).push(b), a)
//     // return (a[f(b, i, x)] ||= []).push(b), a), {}
//   }, {})
// }
// x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {})

export const toCurrency = (value: number | undefined | string): string => {
  if (!value) {
    return ''
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(Number(value))
}

export const toPercentage = (value: number, precision = 0) => {
  return `${(value * 100).toFixed(precision)}%`
}

export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch { }

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  )
  return error
}

export const classToJSON = (source: Record<string, any>) => {
  const properties: Record<string, any> = {}

  return Object.getOwnPropertyNames(source).reduce((object, propertyName) => {
    object[propertyName] = source[propertyName]
    return object
  }, properties)
}
