import type { VTextField } from "vuetify/components/VTextField"

export type DataPoint = {
  label: string
  text: string | number | undefined
}

export type Nullable<T> = T | null | undefined

type ValidValue<T> = Exclude<T, null | undefined | 0 | '' | false>

export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x)

type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A

export type ValidationRule = UnwrapReadonlyArray<VTextField['rules']>
