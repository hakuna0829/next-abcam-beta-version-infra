import { Facet, Filter, Product } from '@browse/search/search.type'

type ResultTableProps = {
  sorting: string
  keywords: string
  productItemsCount: number
  productItems: Product[]
  filters: Filter[]
  facets: Facet[]
  setProductItems: (items: Product[]) => void
}

export type { ResultTableProps }
