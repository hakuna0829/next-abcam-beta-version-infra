import React from 'react'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { OverviewPageProps } from '@browse/product/overview/overview.type'
import { loadSearch } from '@browse/search/search.effects'
import { getFiltersFromQueryParams } from '@browse/utils'
import { SearchProps } from '@browse/search/search.type'
import { SearchTemplate } from '@browse/search/template/template'

const SearchResults = (props: SearchProps) => {
  return <SearchTemplate {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<GetServerSidePropsResult<SearchProps>> => {
  const filters = getFiltersFromQueryParams(query)
  const sorting = query?.sorting?.toString() ?? ''
  const keywords = query?.keywords?.toString() ?? ''

  const [search] = await Promise.all([
    loadSearch(keywords, filters, sorting, 0, 20),
  ])

  return {
    props: {
      search,
      sorting,
      keywords,
      filters,
    },
  }
}

export default SearchResults
