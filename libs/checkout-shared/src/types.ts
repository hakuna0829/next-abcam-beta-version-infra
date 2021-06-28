export type Price = {
  value: number
  currency: '€' | '$' | '£'
}

export type Restriction = {
  title: string
  message: string
}

export type Size = {
  value: number
  unit: string
  default?: boolean
  price: Price
  maxQuantity: number
}

export type Product = {
  abId: string
  restriction?: Restriction
  sizes?: Size[]
}
