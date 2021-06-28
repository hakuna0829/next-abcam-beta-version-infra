import { SearchService } from '@browse/search/search.service'

import { Filter, SearchResult } from '@browse/search/search.type'

export const loadResults = async <T>(
  keywords: string,
  facets: Filter[]
): Promise<T> => {
  return SearchService.getResults(keywords, facets)
    .then((results) => {
      return results.data
    })
    .catch((e) => console.error(e.response.status))
}

export const loadSearch = async (
  keywords = '',
  facets: Filter[],
  sort: string,
  offset: number,
  limit: number
): Promise<SearchResult> => {
  return SearchService.getSearch(keywords, sort, facets, offset, limit)
    .then((search) => {
      return search.data
    })
    .catch((e) => undefined)
}
