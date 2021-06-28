import type { FacetCategories } from '@browse/search/search.type'

export type Categories = {
  header: Header
  items: Array<CategoryItems>
}

export type CategoryItems = {
  categoryType: string
  totalProducts: number
  facetCategories: Array<FacetCategories>
}

export type CategoryPropTypes<T> = {
  category: T
}

export type CategoryResponse = {
  categories: Categories
}

export type Header = {
  productCount: number
}
