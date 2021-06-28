import { Price } from '@checkout-shared/types'
export interface Size {
  selected?: boolean
  value: number
  sku: string
  unit: string
  quantities: {
    value: number
    selected?: boolean
  }[]
}

export interface BasketItem {
  abId: string
  id: string
  name: string
  sizes: Size[]
  availability: {
    inStock: boolean
    restricted: boolean
    message: string
  }
  unitPrice: {
    original: Price
    price: Price
  }
  itemTotal: {
    original: Price
    price: Price
  }
}

export interface ShoppingBasket {
  id: string
  customerId: string
  items: BasketItem[]
  subtotal: Price
  vat: {
    percentage: number
    value: Price
  }
  discount: {
    percentage: number
    value: Price
  }
  shippingCost: Price
  orderTotal: Price
}

export const defaultShoppingBasket: ShoppingBasket = {
  id: '',
  customerId: '',
  items: [],
  subtotal: { value: 0, currency: '€' },
  vat: {
    percentage: 0,
    value: { value: 0, currency: '€' },
  },
  discount: {
    percentage: 0,
    value: { value: 0, currency: '€' },
  },
  shippingCost: { value: 0, currency: '€' },
  orderTotal: { value: 0, currency: '€' },
}
