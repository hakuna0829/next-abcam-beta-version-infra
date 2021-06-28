import type { ParsedUrlQuery } from 'querystring'
import type { Filter } from '@browse/search/search.type'

const getFiltersFromQueryParams = (queryParams: ParsedUrlQuery) =>
  Object.keys(queryParams)
    .filter((key: string) => key.indexOf('facets') !== -1)
    .reduce((filters: Filter[], key) => {
      const values = queryParams[key] ?? ''.toString().split('|')
      if (Array.isArray(values)) {
        const type = key.split('.')[1]
        const filtersByKey = values.map(
          (value: string): Filter => ({ label: value, type })
        )
        filters.push(...filtersByKey)

        return filters
      }

      return []
    }, [])

export { getFiltersFromQueryParams }
