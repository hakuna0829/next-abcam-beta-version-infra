import { SearchProps } from '@browse/search/search.type'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import {
  ResetFilters,
  SetFilters,
} from '@browse/store/actions/search-result-actions'
import { State } from '@browse/store'
import { getQueryParams } from '@browse/utils'
import { Helmet } from 'react-helmet'
import searchStyles from '@browse/search/search.module.css'
import { Button } from '@browse/components/button'
import { testTagProp } from '@browse/common/tagging'
import { ReactComponent as ArrowLeft } from '@browse/public/icons/arrow-left.svg'
import { FormattedMessage } from 'react-intl'
import messages from '@browse/messages'
import styles from '@browse/search/filters-navigation/filters-navigation.module.css'
import { Sorting } from '@browse/search/sorting/sorting'
import { FiltersNavigation } from '@browse/search/filters-navigation/filters-navigation'
import { ResultTable } from '@browse/search/result-table/result-table'
import { grey20 } from '@browse/public'

const svgProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
  fill: grey20,
}

export const SearchTemplate = (props: SearchProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    search: {
      products: { facets, header, items },
    },
    sorting,
    keywords,
    filters,
  } = props

  useEffect(() => {
    dispatch(SetFilters(filters))
  }, [])
  const search = useSelector((state: State) => state.searchResultReducer.search)

  const filtersFromStore = search?.filters
  const sortingFromStore = search?.sorting

  useEffect(() => {
    if (filtersFromStore.length > 0) {
      const res = getQueryParams(filtersFromStore, keywords, sortingFromStore)
      router.push(`/search?${res}`)
    }
  }, [filtersFromStore, sortingFromStore, keywords])

  const [productItems, setProductItems] = useState(items)

  const title = useMemo(() => {
    return filters?.map((filter) => filter.label).join(' ')
  }, [filters])

  const [showBackButton, setShowButton] = useState(false)
  const [backButtonText, setBackButtonText] = useState('')

  const values = {
    productCount: header.productCount,
    productName: 'products',
  }

  return (
    <>
      <Helmet>
        <title>Results for "{title}" | Abcam</title>
      </Helmet>
      <div>
        <div className={searchStyles.header}>
          <div>
            {showBackButton && (
              <div className={searchStyles.backButton}>
                <Button
                  {...testTagProp('back-button')}
                  variant={'tertiary'}
                  leftIcon={<ArrowLeft {...svgProps} />}
                  size={'small'}
                  background={'light'}
                  onClick={() => {
                    dispatch(ResetFilters())
                  }}
                >
                  {backButtonText}
                </Button>
              </div>
            )}
          </div>

          <h1 className={searchStyles.title} {...testTagProp('search-title')}>
            <FormattedMessage
              {...messages.searchResultsFound}
              values={values}
            />
          </h1>

          <div className={styles.commonRelevanceButtonWrapper}>
            <Sorting />
          </div>
        </div>

        <FiltersNavigation facets={facets} />
        <ResultTable
          sorting={sorting}
          keywords={keywords}
          productItemsCount={header.productCount}
          productItems={productItems}
          setProductItems={setProductItems}
          facets={facets}
          filters={filters}
        />
      </div>
    </>
  )
}
