import { Body } from './body/body'
import { Header } from './header/header'

import styles from './category.module.css'

import type { FC } from 'react'
import type {
  CategoryPropTypes,
  CategoryResponse,
} from '@browse/category/category.type'
import type { EntityCategoryResponse } from '@browse/entity/entity.type'

const isCategories = (item: unknown): item is CategoryResponse => {
  return !!(item as CategoryResponse)?.categories
}

export const Category: FC<
  CategoryPropTypes<CategoryResponse | EntityCategoryResponse>
> = ({ category }) => {
  return isCategories(category) ? (
    <div className={styles.container}>
      <Header
        categoryCount={category.categories.items.length}
        categoryType={category.categories.items[0].categoryType}
        productCount={category.categories.header.productCount}
      />
      {category.categories.items[0].facetCategories && (
        <Body facetCategories={category.categories.items[0].facetCategories} />
      )}
    </div>
  ) : (
    <div>
      <Header
        categoryCount={category.entity.totalCategories}
        categoryType={category.entity.categories[0].categoryType}
        productCount={category.entity.totalProducts}
      />
      {category.entity.categories[0].facetCategories && (
        <Body facetCategories={category.entity.categories[0].facetCategories} />
      )}
    </div>
  )
}
