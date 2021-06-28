import type { ParsedUrlQuery } from 'querystring'
import type { Filter } from '@browse/search/search.type'

const getFiltersFromQueryParams = (queryParams: ParsedUrlQuery) =>
  Object.keys(queryParams)
    .filter((key: string) => key.indexOf('facets') !== -1)
    .reduce((filters: Filter[], key) => {
      const currentQueryParams = (queryParams[key] || '').toString()
      const values = currentQueryParams.split('|')
      const type = key.split('.')[1]
      const filtersByKey = values.map(
        (value: string): Filter => ({ label: value, type })
      )
      filters.push(...filtersByKey)
      return filters
    }, [])

const getQueryParams = (
  filters: Filter[],
  keywords: string,
  sorting: string
) => {
  const groupedFilters = filters.reduce((groups: any, item: Filter) => {
    const { label, type } = item
    if (!groups[type]) {
      groups[type] = [label]
    } else {
      groups[type] = [...groups[type], label]
    }

    return groups
  }, {})

  const parameters = {
    sorting: sorting,
    ...(keywords && { keywords }),
  }

  const facets = Object.keys(groupedFilters).map(
    (key) => `facets.${key}=${groupedFilters[key].join('|')}`
  )

  const otherParams = Object.keys(parameters).map(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (key) => `${key}=${parameters[key]}`
  )

  return [...facets, ...otherParams].join('&')
}

const getNoResultMessage = (filters: Filter[], keywords: string) => {
  const filtersQuery = filters?.map((filter: Filter) => filter.label).join(' ')

  return filtersQuery && keywords
    ? `${filtersQuery} ${keywords}`
    : filtersQuery || keywords
}

export { getQueryParams, getFiltersFromQueryParams, getNoResultMessage }
