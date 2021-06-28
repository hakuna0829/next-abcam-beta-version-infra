import { SizeItem } from '../components/sizes-box/sizes-box'
import { Price } from '../components/buy-box/buy-box'

const defaultSizeItem = { size: 500, unit: 'µg' }
const sizeItems = [
  defaultSizeItem,
  { size: 1000, unit: 'µg' },
  { size: 1500, unit: 'µg' },
  { size: 2000, unit: 'µg' },
]

interface BuyBoxResponse {
  price: Price
  defaultSizeItem: SizeItem
  sizeItems: SizeItem[]
}

const fetchBuyBoxData = async (): Promise<BuyBoxResponse> => {
  try {
    const response: BuyBoxResponse = {
      price: { value: 550, currency: '€' },
      defaultSizeItem,
      sizeItems,
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response)
      }, 1000)
    })
  } catch (err) {
    console.error(err)
    return err
  }
}

export { fetchBuyBoxData, BuyBoxResponse }
