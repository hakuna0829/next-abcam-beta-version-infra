import { Facet, FacetsHeader, Value } from '@browse/search/search.type'

export interface SearchCategoriesResultProps {
  facets: Facet[]
  facetsHeader: FacetsHeader | undefined
  onValueSelected?: (facetValue: Value, facetType: string) => void
  onValueEntered?: (facetValue: Value, facetType: string) => void
  onValueLeft?: (facetValue: Value, facetType: string) => void
  onSearchExecuted?: () => void
}
