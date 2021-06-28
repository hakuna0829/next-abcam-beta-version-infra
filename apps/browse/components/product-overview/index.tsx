import React from 'react'
import styled from 'styled-components'
import { grey20, spacing5 } from '@browse/public'
import { testTagProp } from '@browse/common/tagging'

export const ProductOverview = styled.div`
  font-size: 1.125rem;
  font-weight: 'normal';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${grey20};
  margin-bottom: ${spacing5};
`

const GreenText = styled.span`
  color: #1aab71;
`

export const ProductOverviewComponent: React.FC<{
  totalProducts: number
  totalCategories: number
}> = ({ totalProducts, totalCategories }) => {
  const renderProductsCount = () => {
    return (
      <GreenText {...testTagProp('products-number')}>
        {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
      </GreenText>
    )
  }

  const renderCategoriesCount = () => {
    return (
      <GreenText {...testTagProp('categories-number')}>
        {totalCategories} {totalCategories === 1 ? 'category' : 'categories'}{' '}
      </GreenText>
    )
  }
  return (
    <ProductOverview>
      {`We found `} {renderProductsCount()}
      {` in `}
      {renderCategoriesCount()}
    </ProductOverview>
  )
}
