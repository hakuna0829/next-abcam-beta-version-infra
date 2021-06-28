import { BasketItem } from '../../entity/basket-item.type'
import type { Price } from '@checkout-shared/types'

export const basketItemsMock: BasketItem[] = [
  {
    abId: 'ab120002',
    id: 'some-random-id',
    name: 'L-AP4, group III mGlu agonist',
    sizes: [
      {
        selected: true,
        value: 10,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
      {
        selected: true,
        value: 20,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
    ],
    availability: {
      inStock: true,
      restricted: false,
      message: 'Estimated delivery on Friday, 30 April',
    },
    unitPrice: {
      original: {
        value: 700,
        currency: '€',
      },
      price: {
        value: 700,
        currency: '€',
      },
    },
    itemTotal: {
      original: {
        value: 600,
        currency: '€',
      },
      price: {
        value: 550,
        currency: '€',
      },
    },
  },
  {
    abId: 'ab290',
    id: 'some-random-id',
    name: 'Anti-GFP antibody',
    sizes: [
      {
        selected: true,
        value: 10,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
      {
        selected: true,
        value: 20,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
    ],
    availability: {
      inStock: false,
      restricted: false,
      message: 'Estimated delivery on Friday, 30 April',
    },
    unitPrice: {
      original: {
        value: 700,
        currency: '€',
      },
      price: {
        value: 700,
        currency: '€',
      },
    },
    itemTotal: {
      original: {
        value: 600,
        currency: '€',
      },
      price: {
        value: 550,
        currency: '€',
      },
    },
  },
  {
    name: 'Anti-GFP antibody',
    abId: 'ab1818411',
    id: 'some-random-id',
    sizes: [
      {
        selected: true,
        value: 10,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
      {
        selected: true,
        value: 20,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
    ],
    availability: {
      inStock: true,
      restricted: false,
      message: 'Estimated delivery on Friday, 30 April',
    },
    unitPrice: {
      original: {
        value: 700,
        currency: '€',
      },
      price: {
        value: 700,
        currency: '€',
      },
    },
    itemTotal: {
      original: {
        value: 600,
        currency: '€',
      },
      price: {
        value: 550,
        currency: '€',
      },
    },
  },
]

export const mockItems: (number?) => BasketItem[] = (amount) => {
  return basketItemsMock.slice(0, amount)
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

export const ShoppingBasketMock: ShoppingBasket = {
  id: 'someRandomId',
  customerId: 'someRandomId',
  items: mockItems(10),
  subtotal: {
    value: 500,
    currency: '€',
  },
  vat: {
    percentage: 20,
    value: {
      value: 500,
      currency: '€',
    },
  },
  discount: {
    percentage: 20,
    value: {
      value: 500,
      currency: '€',
    },
  },
  shippingCost: {
    value: 500,
    currency: '€',
  },
  orderTotal: {
    value: 500,
    currency: '€',
  },
}
