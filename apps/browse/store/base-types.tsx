import { Product } from '@browse/search/search.type'

export interface ApplicationState {
  loading: {
    summary: boolean
    datasheet: boolean
    images: boolean
    keyfacts: boolean
    publications: boolean
    reactivity: boolean
    support: boolean
    targetsynonyms: boolean
  }
  product: Product
}
