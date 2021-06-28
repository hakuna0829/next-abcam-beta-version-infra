import { Category } from '@browse/category/category'
import { loadResults } from '@browse/search/search.effects'
import { getFiltersFromQueryParams } from '@browse/utils'

import type { FC } from 'react'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type {
  CategoryResponse,
  CategoryPagePropTypes,
} from '@browse/category/category.type'

export const CategoryPage: FC<CategoryPagePropTypes> = ({ category }) => {
  return <Category data={category} />
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<GetServerSidePropsResult<CategoryPagePropTypes>> => {
  const keywords = query['facets.keywords']?.toString() ?? ''
  const facets = getFiltersFromQueryParams(query)

  const category = await loadResults<CategoryResponse>(keywords ?? '', facets)

  return {
    props: {
      category,
    },
  }
}

export default CategoryPage
