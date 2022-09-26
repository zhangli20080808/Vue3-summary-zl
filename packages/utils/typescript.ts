// -readonly 什么意思来着，我忘了，擦

export const mutable = <T extends readonly any[] | Record<string, any>>(
  val: T
) => val as Mutable<typeof val>

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T
